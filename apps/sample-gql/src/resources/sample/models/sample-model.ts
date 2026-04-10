import { Field, ID, ObjectType } from '@vnodes/graphql';

@ObjectType({ description: 'samples' })
export class SampleModel {
    @Field(() => ID)
    id?: string = 'id';

    @Field(() => String)
    title?: string = 'Defautl title';

    @Field({ nullable: true })
    description?: string = 'Default description';

    @Field()
    creationDate?: Date = new Date();

    @Field(() => [String])
    ingredients: string[] = [];

    constructor(data: Partial<SampleModel> = {}) {
        Object.assign(this, data);
    }
}
