import { Prop } from '@vnodes/property';

export class TagReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) updatedAt: Date;
    @Prop({ required: false }) deletedAt?: Date;
    @Prop({}) value: string;
    @Prop({ required: false }) description?: string;
}
