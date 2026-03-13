import { Prop } from '@vnodes/core/property';
import { PartialType } from '@vnodes/core/swagger';

import * as P from '../prisma/index.js';

export class PhoneQueryDto implements P.QueryMany<P.Prisma.PhoneScalarFieldEnum> {
    @Prop({ minimum: 0 }) take?: number;
    @Prop({ minimum: 0 }) skip?: number;
    @Prop() search?: string;
    @Prop({ enum: P.Prisma.PhoneScalarFieldEnum }) orderBy?: P.Prisma.PhoneScalarFieldEnum;
    @Prop({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
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