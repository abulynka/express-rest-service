import { LoggerService } from '@nestjs/common';
// import { FileLoggerService } from './file-logger.service';

export class AppLoggerService implements LoggerService {
  // constructor(private readonly fileLoggerService: FileLoggerService) { }

  log(message: string) {
    // this.fileLoggerService.log();
    console.log(message);
  }
  error(message: string, trace: string) {
    console.log(message, trace);
  }
  warn(message: string) {
    console.log(message);
  }
  debug(message: string) {
    console.log(message);
  }
  verbose(message: string) {
    console.log(message);
  }
}
