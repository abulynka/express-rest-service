import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
// import { FileLoggerService } from './file-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log(context.switchToHttp().getRequest());

    // const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(
            () => {
                // console.log(context.switchToHttp().getRequest());

                // console.log(context.switchToHttp().getRequest()['url']);
                // console.log(context.switchToHttp().getRequest()['method']);
                // console.log(context.switchToHttp().getRequest()['params']);
                // console.log(context.switchToHttp().getRequest()['query']);
                // console.log(context.switchToHttp().getResponse()['statusCode']);
                // console.log(`${ context.switchToHttp().getResponse()['statusMessage'] }`);

                // console.log(`After... ${Date.now() - now}ms`);

                const message = `[${ new Date().toISOString() }]`
                    + ` "${ context.switchToHttp().getRequest()['url'] }"`
                    + ` [${ context.switchToHttp().getResponse()['statusCode'] } - ${ JSON.stringify(context.switchToHttp().getResponse()['statusMessage'] || '') }]`
                    + ` ${ JSON.stringify(context.switchToHttp().getRequest()['query']) }`
                    + ` - `
                    + `${ JSON.stringify(context.switchToHttp().getRequest()['params'] || '') }`
                    + ` - `
                    + `${ JSON.stringify(context.switchToHttp().getRequest()['body']) }`;
       
                LoggerService.singleton().log(message, LoggerService.LOG_HTTP_SUCCESS);
            }
        ),
      );
  }
}
