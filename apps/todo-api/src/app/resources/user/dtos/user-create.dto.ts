import { Prop } from '@vnodes/property';

export class UserCreateDto {
    @Prop({ type: String, maxLength: 255 }) firstName: string;
    @Prop({ type: String, maxLength: 255 }) lastName: string;
    @Prop({ type: String, required: false, maxLength: 255 }) middleName?: string;
}
