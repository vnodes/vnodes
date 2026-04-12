/** biome-ignore-all lint/style/useImportType: DI */
import { Args, Mutation, Query, Resolver, Subscription } from '@vnodes/graphql';
import { PubSubService } from '@vnodes/nestjs-common';
import { Any } from '@vnodes/types';
import { SampleCreateInput, SampleUpdateInput } from './models/sample-create.input.js';
import { SampleModel } from './models/sample-model.js';
import { SampleQueryArgs } from './models/sample-query.args.js';

@Resolver(() => SampleModel)
export class SamplesResolver {
    constructor(protected readonly pubSub: PubSubService) {}

    @Query(() => SampleModel, { name: 'findSampleById' })
    async findById(@Args('id') id: string) {
        return new SampleModel({ id });
    }

    @Query(() => [SampleModel], { name: 'findManySamples' })
    async findMany(@Args() sampleArgs: SampleQueryArgs) {
        console.log(sampleArgs);
        return [new SampleModel(), new SampleModel()];
    }

    @Mutation(() => SampleModel, { name: 'createSample' })
    async create(@Args('sample') data: SampleCreateInput) {
        const result = new SampleModel(data);
        await this.pubSub.publish('sampleCreated', { sampleCreated: result });
        return result;
    }

    @Mutation(() => SampleModel, { name: 'deleteSampleById' })
    async deleteById(@Args('id') id: string) {
        return { id };
    }

    @Mutation(() => SampleModel, { name: 'updateSampleById' })
    async updateById(@Args('id') id: string, @Args('sample') data: SampleUpdateInput) {
        return { id, ...data };
    }

    @Subscription(() => SampleModel, { name: 'sampleCreated' })
    onCreate(): AsyncIterableIterator<Any, Any> {
        return this.pubSub.asyncIterableIterator('sampleCreated');
    }
}
