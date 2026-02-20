import { Prop } from '@vnodes/property';

export class UserReadDto {
    @Prop({ type: Number }) id?: number;
    @Prop({ type: String }) uuid?: string;
    @Prop({ type: Date }) createdAt?: Date;
    @Prop({ type: Date }) updatedAt: Date;
    @Prop({ type: Date, required: false }) deletedAt?: Date;
    @Prop({ type: String, maxLength: 255 }) firstName: string;
    @Prop({ type: String, maxLength: 255 }) lastName: string;
    @Prop({ type: String, required: false, maxLength: 255 }) middleName?: string;
}
