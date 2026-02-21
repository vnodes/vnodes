import { Prop } from '@vnodes/property';

export class UserReadDto
{
@Prop({  }) id?: number;
@Prop({  }) uuid?: string;
@Prop({  }) createdAt?: Date;
@Prop({  }) updatedAt: Date;
@Prop({ required: false }) deletedAt?: Date;
@Prop({ maxLength: 255 }) firstName: string;
@Prop({ maxLength: 255 }) lastName: string;
@Prop({ required: false,maxLength: 255 }) middleName?: string
}