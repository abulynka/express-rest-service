import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { stringify } from 'flatted';

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

        const log = status + ' - ' + stringify(message);
        process.stdout.write(log);

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
