import { Prop } from '@vnodes/property';

export class UserCreateDto {
    @Prop({ maxLength: 255 }) firstName: string;
    @Prop({ maxLength: 255 }) lastName: string;
    @Prop({ required: false, maxLength: 255 }) middleName?: string;
}
