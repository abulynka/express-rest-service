import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { stringify } from 'flatted';
import { LoggerService } from './logger.service';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        let response;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        };

        const log = `${status  } - ${  stringify(message)}`;
        new LoggerService().log(log, LoggerService.LOG_HTTP_ERROR);

        if (process.env['USE_FASTIFY'] === 'true') {
          response = ctx.getResponse<Response>();
          response
            .status(status)
            .send(stringify(message));
        } else {
          response = ctx.getResponse<Response>();

          response
            .status(status)
            .json(message);
        }
    }
}
