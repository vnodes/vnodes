import { InputType, Prop } from '@vnodes/graphql';

@InputType()
export class SampleInput {
    @Prop({ maximum: 50, required: true })
    title: string;

    @Prop({ minimum: 30, maximum: 400 })
    description?: string;

    @Prop({}, () => [String])
    ingredients: string[];
}
