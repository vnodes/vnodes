import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: any) {
        if (exception.code === 'P2025') {
            throw new NotFoundException();
        }
    }
}
