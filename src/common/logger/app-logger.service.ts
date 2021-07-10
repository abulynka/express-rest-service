import { LoggerService } from '@nestjs/common';
import { LoggerService as LocalLoggerService } from './logger.service';

export class AppLoggerService implements LoggerService {
  private localLoggerService: LocalLoggerService;

  constructor() {
    this.localLoggerService = new LocalLoggerService();
    this.localLoggerService.setLogTo(LocalLoggerService.LOG_TO_STDOUT_FILE);
  }

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
