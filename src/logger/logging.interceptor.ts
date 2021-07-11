import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    return next
      .handle()
      .pipe(
        tap(
            () => {
                const message = `[${ new Date().toISOString() }]`
                    + ` "${ context.switchToHttp().getRequest().url }"`
                    + ` [${ context.switchToHttp().getResponse().statusCode } - ${ JSON.stringify(context.switchToHttp().getResponse().statusMessage || '') }]`
                    + ` ${ JSON.stringify(context.switchToHttp().getRequest().query) }`
                    + ` - `
                    + `${ JSON.stringify(context.switchToHttp().getRequest().params || '') }`
                    + ` - `
                    + `${ JSON.stringify(context.switchToHttp().getRequest().body) }`;
       
                this.loggerService.log(message, LoggerService.LOG_HTTP_SUCCESS);
            }
        ),
      );
  }
}