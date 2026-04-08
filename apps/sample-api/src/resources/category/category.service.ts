import { Injectable } from '@vnodes/nestjs/common';
import { InjectDelegate } from '@vnodes/prisma';
import type { Prisma } from '@vnodes/sample-db/client';
import { BaseCategoryService } from '@vnodes/sample-db/nestjs';

@Injectable()
export class CategoryService extends BaseCategoryService {
    constructor(@InjectDelegate('category') repo: Prisma.CategoryDelegate) {
        super(repo);
    }
}
