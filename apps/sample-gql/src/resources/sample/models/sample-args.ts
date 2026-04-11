import { ArgsType, Prop } from '@vnodes/graphql';

@ArgsType()
export class SampleArgs {
    @Prop({ minimum: 0 })
    skip: number = 0;

    @Prop({ minimum: 1 })
    take: number = 25;
}
