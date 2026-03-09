import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';

import * as P from '../prisma/index.js';

export class PhoneQueryDto implements P.QueryMany<P.Prisma.PhoneScalarFieldEnum> {
    @Prop() take?: number;
    @Prop() skip?: number;
    @Prop() search?: string;
    @Prop() orderBy?: P.Prisma.PhoneScalarFieldEnum;
    @Prop() orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}

export class PhoneReadDto
{
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop({ enum: P.$Enums.ContactType }) contactType?: P.$Enums.ContactType;
@Prop() phone?: string;
@Prop() notes?: string;
@Prop() openTime?: string;
@Prop() contactId?: number
}
export class PhoneCreateDto
{
@Prop({ enum: P.$Enums.ContactType,required: true }) contactType: P.$Enums.ContactType;
@Prop({ required: true }) phone: string;
@Prop() notes?: string;
@Prop() openTime?: string;
@Prop({ required: true }) contactId: number
}
export class PhoneUpdateDto extends PartialType(PhoneCreateDto) {}