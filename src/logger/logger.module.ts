import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { AppLoggerService } from './app-logger.service';
import { LoggingInterceptor } from './logging.interceptor';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  providers: [LoggerService, AppLoggerService, LoggingInterceptor, AllExceptionsFilter, HttpExceptionFilter],
  exports: [LoggerService, AppLoggerService, LoggingInterceptor],
})
export class LoggerModule {}
