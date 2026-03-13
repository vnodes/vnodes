import { User, UserInfo } from '@vnodes/core/auth';
import { AutoController } from '@vnodes/core/autowire';
import { Body, Param, ParseIntPipe, Query } from '@vnodes/core/common';
import { Prop } from '@vnodes/core/property';

export class SomeQuery {
    @Prop() take: number;
    @Prop() skip: number;
    @Prop() search: string;
    @Prop({ enum: ['id', 'name'] }) orderBy: string;
    @Prop({ enum: ['asc', 'desc'] }) orderDir: string;
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
    find(@Query() query: SomeQuery) {
        return { query };
    }

    findOneById(@Param('id', ParseIntPipe) id: number) {
        return { id };
    }

    deleteOneById(@Param('id', ParseIntPipe) id: number, @UserInfo() user: User) {
        return { id, userId: user.id };
    }

    updateOneById(@Param('id', ParseIntPipe) id: number, @Body() body: SomeUpdate, @UserInfo() user: User) {
        return { id, body, userId: user.id };
    }
}
