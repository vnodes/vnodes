/** biome-ignore-all lint/suspicious/noExplicitAny: Nest */
import { type ArgumentsHost, Catch, type ExceptionFilter } from "@nestjs/common";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        // Postgres error code for unique_violation is 23505
        if (exception.code === "23505") {
            return response.status(409).json({
                statusCode: 409,
                message: "Unique constraint failed",
                detail: exception.detail, // "Key (title)=(string) already exists."
            });
        }

        return response.status(500).json({ message: "Internal Server Error" });
    }
}
