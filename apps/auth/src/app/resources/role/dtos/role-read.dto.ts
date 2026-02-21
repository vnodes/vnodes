import { Prop } from '@vnodes/property';

export class RoleReadDto
{
@Prop({  }) id?: number;
@Prop({  }) createdAt?: Date;
@Prop({  }) updatedAt: Date;
@Prop({ required: false }) deletedAt?: Date;
@Prop({  }) name: string
}