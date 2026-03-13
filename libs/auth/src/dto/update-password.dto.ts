import { Prop } from '@vnodes/property';

export class UpdatePasswordDto {
    @Prop({ required: true, format: 'password' }) password: string;
}
