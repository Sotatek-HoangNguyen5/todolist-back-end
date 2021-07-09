import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const message = exceptionResponse?.message || 'UNKNOWN';

    response.status(status).json({
      error: exceptionResponse.error + ` (${status})`,
      code: exceptionResponse?.code,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
