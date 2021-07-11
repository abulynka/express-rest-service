import { Catch, ArgumentsHost, Injectable } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from 'src/logger/logger.service';
import { stringify } from 'flatted';

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {
        super();
        this.loggerService.setLogTo(LoggerService.LOG_TO_STDOUT_FILE);

        process.on('uncaughtException', async (err: string, origin: string) => {
            await this.loggerService.log(
                `[${ new Date().toISOString() }] ${ err.toString() } ${ origin.toString() } ${ stringify(new Error().stack) }`,
                LoggerService.LOG_APP_ERROR,
                true
            );
        });
          
        process.on('unhandledRejection', async (reason, promise) => {
            await this.loggerService.log(
                `[${ new Date().toISOString()  }] ${ reason?.toString()  } ${ stringify(promise) }`,
                LoggerService.LOG_APP_ERROR,
                true
            );
        });
    }

    catch(exception: unknown, host: ArgumentsHost) {
        this.loggerService.log(stringify(exception) + ' ' + stringify(host), LoggerService.LOG_ALL_EXCEPTIONS);
        super.catch(exception, host);
    }
}
