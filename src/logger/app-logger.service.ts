import { Injectable, LoggerService } from '@nestjs/common';
import { LoggerService as LocalLoggerService } from './logger.service';

@Injectable()
export class AppLoggerService implements LoggerService {
  constructor(private readonly localLoggerService: LocalLoggerService) { }

  log(message: string) {
    this.localLoggerService.log(message, LocalLoggerService.LOG_APP_LOG);
  }

  error(message: string, trace: string) {
    this.localLoggerService.log(
      `Message: ${  message  }. Trace: ${  trace}`,
      LocalLoggerService.LOG_APP_ERROR
    );
  }

  warn(message: string) {
    this.localLoggerService.log(message, LocalLoggerService.LOG_APP_WARN);
  }

  debug(message: string) {
    this.localLoggerService.log(message, LocalLoggerService.LOG_APP_DEBUG);
  }

  verbose(message: string) {
    this.localLoggerService.log(message, LocalLoggerService.LOG_APP_VERBOSE);
  }
}
