import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { stringify } from 'flatted';

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
                    + ` [${ context.switchToHttp().getResponse().statusCode } - ${ stringify(context.switchToHttp().getResponse().statusMessage || '') }]`
                    + ` ${ stringify(context.switchToHttp().getRequest().query) }`
                    + ` - `
                    + `${ stringify(context.switchToHttp().getRequest().params || '') }`
                    + ` - `
                    + `${ stringify(context.switchToHttp().getRequest().body) }`;
       
                this.loggerService.log(message, LoggerService.LOG_HTTP_SUCCESS);
            }
        ),
      );
  }
}
