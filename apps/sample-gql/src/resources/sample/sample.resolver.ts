/** biome-ignore-all lint/style/useImportType: DI */

import { Args, Mutation, PubSub, Query, Resolver, Subscription } from '@vnodes/graphql';
import type { Any } from '@vnodes/types';
import { SampleArgs } from './models/sample-args.js';
import { SampleInput } from './models/sample-input.js';
import { SampleModel } from './models/sample-model.js';

const pubSub = new PubSub();

@Resolver(() => SampleModel)
export class SamplesResolver {
    @Query(() => SampleModel)
    async sampleById(@Args('id') id: string) {
        return new SampleModel({ id });
    }

    @Query(() => [SampleModel])
    async samples(@Args() sampleArgs: SampleArgs) {
        return [new SampleModel(), new SampleModel()];
    }

    @Mutation(() => SampleModel)
    async createSample(@Args('sample') data: SampleInput) {
        await pubSub.publish('sampleAdded', { sampleAdded: new SampleModel(data) });
        return new SampleModel(data);
    }

    @Mutation(() => Boolean)
    async deleteSample(@Args('id') id: string) {
        return { id };
    }

    @Subscription(() => SampleModel)
    sampleAdded(): Any {
        return pubSub.asyncIterableIterator('sampleAdded');
    }
}
