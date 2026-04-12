/** biome-ignore-all lint/style/useImportType: DI */

import { ArgsData, ArgsID, Autowire, ResourceResolver } from '@vnodes/autowire/resolver';
import { PubSubService } from '@vnodes/common/graphql';
import { Args } from '@vnodes/graphql';
import { Any } from '@vnodes/types';
import { SampleCreateInput, SampleUpdateInput } from './models/sample-create.input.js';
import { SampleModel } from './models/sample-model.js';
import { SampleQueryArgs } from './models/sample-query.args.js';

@Autowire({ model: SampleModel })
export class SampleResolver implements ResourceResolver {
    constructor(protected readonly pubSub: PubSubService) {}

    async findMany(@Args() args: SampleQueryArgs) {
        console.log(args);
        return [new SampleModel(), new SampleModel()];
    }

    async findOneById(@ArgsID() id: number) {
        return new SampleModel({ id });
    }

    async createOne(@ArgsData() data: SampleCreateInput) {
        const result = new SampleModel(data);
        await this.pubSub.publish('createdSample', { createdSample: result });
        return result;
    }

    async deleteOneById(@ArgsID() id: number) {
        return { id };
    }

    async updateOneById(@ArgsID() id: number, @ArgsData() data: SampleUpdateInput) {
        return { id, ...data };
    }

    created(): AsyncIterableIterator<Any, Any> {
        return this.pubSub.asyncIterableIterator('createdSample');
    }

    updated(): AsyncIterableIterator<Any, Any> {
        return this.pubSub.asyncIterableIterator('updatedSample');
    }

    deleted(): AsyncIterableIterator<Any, Any> {
        return this.pubSub.asyncIterableIterator('deletedSample');
    }
}
