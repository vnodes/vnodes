import { Prop } from '@vnodes/property';

export class TagCreateDto {
    @Prop({ type: String }) value: string;
    @Prop({ type: String, required: false }) description?: string;
}
