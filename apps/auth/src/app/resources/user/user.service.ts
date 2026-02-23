import { Injectable } from '@nestjs/common';
import { InjectDelegate } from '@vnodes/prisma';
import { UserDelegateService } from '../../prisma/services.js';

@Injectable()
export class UserService extends UserDelegateService {
    constructor(@InjectDelegate('user') repo: UserDelegateService['repo']) {
        super(repo);
    }
}
