import { Prop } from '@vnodes/property';

export class TagUpdateDto {
    @Prop({ type: String, required: false })
    value?: string;
    @Prop({ type: String, required: false })
    description?: string;
}
