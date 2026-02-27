import { randomInt } from 'node:crypto';
import { NotFoundException } from '@vnodes/nestjs/common';
import { CrudController } from '@vnodes/nestjs/custom';
import { AppCreateDto, AppDto, AppQueryDto, AppUpdateDto } from './app.dto.js';

@CrudController({
    readDto: AppDto,
    createDto: AppCreateDto,
    updateDto: AppUpdateDto,
    queryDto: AppQueryDto,
})
export class AppController {
    readonly apps: AppDto[] = [];

    findMany(query: AppQueryDto) {
        console.table({ query });
        query.skip = query.skip ?? 0;
        query.take = query.take ?? 20;
        return this.apps
            .filter((e) => {
                if (query.search) {
                    return e.name.includes(query.search);
                }
                return true;
            })
            .slice(query.skip, query.skip + query.take);
    }

    findOneById(id: string) {
        return this.apps.filter((e) => e.id.toString() === id.toString());
    }

    createOne(body: AppCreateDto) {
        console.table({ body });
        this.apps.push({ ...body, id: randomInt(0, 100) });
        return body;
    }

    updateOneById(id: string, body: AppUpdateDto) {
        console.table({ id, body });
        const found = this.apps.find((e) => e.id.toString() === id.toString());
        if (!found) throw new NotFoundException();

        return Object.assign(found, body);
    }

    deleteOneById(id: string) {
        console.table({ id });
        const index = this.apps.findIndex((e) => e.id.toString() === id.toString());

        if (index > 0) {
            return delete this.apps[index];
        }
        throw new NotFoundException();
    }
}
