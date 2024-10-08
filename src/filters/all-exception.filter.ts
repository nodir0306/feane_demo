import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UniqueConstraintError } from "sequelize"

const catchUniqueFieldError = (exception: Error): HttpException | Error =>  {
  if(exception instanceof UniqueConstraintError) {
    const errorMsg = `${exception.errors[0].path} should be unique. Detail: ${exception.errors[0].path}: ${exception.errors[0].value} already exists`
    return new ConflictException(errorMsg)
  }

  return exception
}

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestTime = new Date().toISOString();

    // CATCH UNIQUE FIELD ERROR FROM DATABASE
    exception = catchUniqueFieldError(exception)

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        message: exception.message,
        requestTime,
        url: request.url,
        errorName: exception.name,
        statusCode: exception.getStatus(),
      });
    }

    return response.status(500).json({
      message: exception?.message || 'Internal server error',
      requestTime,
      url: request.url,
      errorName: exception?.name,
      statusCode: 500,
    });
  }
}
