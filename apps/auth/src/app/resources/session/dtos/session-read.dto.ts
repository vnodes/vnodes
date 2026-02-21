import { Prop } from '@vnodes/property';

export class SessionReadDto
{
@Prop({  }) id?: number;
@Prop({  }) createdAt?: Date;
@Prop({  }) updatedAt: Date;
@Prop({ required: false }) deletedAt?: Date;
@Prop({  }) userId: number;
@Prop({ required: false }) ipAddress?: string;
@Prop({ required: false }) deviceId?: string;
@Prop({  }) token: string
}