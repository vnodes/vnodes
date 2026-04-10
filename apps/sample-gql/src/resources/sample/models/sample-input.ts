import { Field, InputType } from '@vnodes/graphql';
import { IsOptional, Length, MaxLength } from '@vnodes/nestjs/class-validator';

@InputType()
export class SampleInput {
    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field((type) => [String])
    ingredients: string[];
}
