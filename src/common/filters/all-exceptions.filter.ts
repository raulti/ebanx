import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException, BadRequestException)
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: NotFoundException | BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.getStatus()).json(0);
    }
}