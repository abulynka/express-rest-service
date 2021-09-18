import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import os from 'os';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { DB } from 'src/common/db';
import { AppModule } from 'src/app.module';
import { LoggingInterceptor } from 'src/logger/logging.interceptor';
import { AllExceptionsFilter } from './logger/all-exceptions.filter';

async function bootstrap() {
  await DB.init();
  process.stdout.write(`DB connected${os.EOL}`);

  let app;
  if (process.env['USE_FASTIFY'] === 'true') {
    process.stdout.write(`Use fastify engine${os.EOL}`);
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  } else {
    process.stdout.write(`Use express engine${os.EOL}`);
    app = await NestFactory.create(AppModule);
  }

  app.useGlobalInterceptors(app.get(LoggingInterceptor));

  app.useGlobalFilters(app.get(AllExceptionsFilter));

  app.useLogger(app.get(AppLoggerService));

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(`${app.get(ConfigService).get('PORT')}`, '0.0.0.0');
}
bootstrap();
