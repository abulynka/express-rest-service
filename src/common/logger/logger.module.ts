
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { AppLoggerService } from './app-logger.service';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService, LoggerService, LoggingInterceptor],
})
export class LoggerModule {}
