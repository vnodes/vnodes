import { Prop } from '@vnodes/property';

export class RolePermissionReadDto
{
@Prop({  }) id?: number;
@Prop({  }) createdAt?: Date;
@Prop({  }) updatedAt: Date;
@Prop({ required: false }) deletedAt?: Date;
@Prop({  }) roleId: number;
@Prop({  }) permissionId: number
}