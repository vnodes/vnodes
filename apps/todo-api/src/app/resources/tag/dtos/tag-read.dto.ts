import { Prop } from '@vnodes/property';

export class TagReadDto {
    @Prop({ type: Number }) id?: number;
    @Prop({ type: Date }) createdAt?: Date;
    @Prop({ type: Date }) updatedAt: Date;
    @Prop({ type: Date, required: false }) deletedAt?: Date;
    @Prop({ type: String }) value: string;
    @Prop({ type: String, required: false }) description?: string;
}
