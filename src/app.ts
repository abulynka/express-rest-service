import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { createConnection } from "typeorm";
import os from 'os';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { HandlerExpress } from './middleware/handler_express';
import { ErrorHandler } from './middleware/error_handler';
import { ErrorHandlerExpress } from './middleware/error_handler_express';
import "reflect-metadata";

ErrorHandler.init();

createConnection()
  .then(() => {
    process.stdout.write(`DB connected${os.EOL}`);
  });

const app = express();

app.use('/', HandlerExpress.process);

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(ErrorHandlerExpress.process);

export default app;