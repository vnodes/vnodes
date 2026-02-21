import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
    protected readonly logger = new Logger(AppService.name);

    @Cron(CronExpression.EVERY_5_SECONDS)
    everySecond() {
        this.logger.log(`Every 5 seconds ${CronExpression.EVERY_5_SECONDS}`);
    }
}
