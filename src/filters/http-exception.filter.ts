import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    let response;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (process.env['USE_FASTIFY'] === 'true') {
      response = ctx.getResponse<Response>();
      response
        .status(status)
        .send(JSON.stringify({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        }));
    } else {
      response = ctx.getResponse<Response>();

      response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    
  }
}
