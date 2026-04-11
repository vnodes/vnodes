import { ObjectType, Prop } from '@vnodes/graphql';

@ObjectType({ description: 'samples' })
export class SampleModel {
    @Prop()
    id?: string = '1';

    @Prop()
    title?: string = 'Defautl title';

    @Prop()
    description?: string = 'Default description';

    @Prop()
    creationDate?: Date = new Date();

    @Prop({}, () => [String])
    ingredients: string[] = [];

    constructor(data: Partial<SampleModel> = {}) {
        Object.assign(this, data);
    }
}
