import { AutoController } from '@vnodes/core/autowire';
import { Body } from '@vnodes/core/common';
import { Prop } from '@vnodes/core/property';

export class SomeQuery {
    @Prop() take: number;
    @Prop() skip: number;
    @Prop() search: string;
    @Prop() orderBy: string;
    @Prop() orderDir: string;
}
export class SomeUpdate {
    @Prop() update: string;
}
export class SomeCreate {
    @Prop() create: string;
}

@AutoController()
export class SomeController {
    createOne(@Body() body: SomeCreate, userId: number) {
        return { body, userId };
    }
    find(query: SomeQuery) {
        return { query };
    }

    findOneById(id: number) {
        return { id };
    }

    deleteOneById(id: number, userId: number) {
        return { id, userId };
    }

    updateOneById(id: number, body: SomeUpdate, userId: number) {
        return { id, body, userId };
    }
}
