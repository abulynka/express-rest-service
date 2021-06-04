import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { HandlerExpress } from './middleware/handler_express';
import { ErrorHandler } from './middleware/error_handler';
import { ErrorHandlerExpress } from './middleware/error_handler_express';

new ErrorHandler().init();

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

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

// app.use('/doc', (req: express.Request, _res: express.Response, next: express.NextFunction) => {
//   swaggerDocument.host = req.get('host');
//   Object.assign(req, {swaggerDoc: swaggerDocument});
//   next();
// }, swaggerUI.serve, swaggerUI.setup());

app.use(new ErrorHandlerExpress().process);
app.use('/', new HandlerExpress().process);

export default app;