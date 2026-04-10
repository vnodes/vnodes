import { ArgsType, Field, Int } from '@vnodes/graphql';
import { Max, Min } from '@vnodes/nestjs/class-validator';

@ArgsType()
export class SampleArgs {
    @Field(() => Int)
    @Min(0)
    skip = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    take = 25;
}
