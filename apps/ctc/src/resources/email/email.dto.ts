import { Prop } from '@vnodes/core/property';
import { PartialType } from '@vnodes/core/swagger';

import * as P from '../prisma/index.js';

export class EmailQueryDto implements P.QueryMany<P.Prisma.EmailScalarFieldEnum> {
    @Prop({ minimum: 0 }) take?: number;
    @Prop({ minimum: 0 }) skip?: number;
    @Prop() search?: string;
    @Prop({ enum: P.Prisma.EmailScalarFieldEnum }) orderBy?: P.Prisma.EmailScalarFieldEnum;
    @Prop({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}

export class EmailReadDto
{
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop({ enum: P.$Enums.ContactType }) contactType?: P.$Enums.ContactType;
@Prop() email?: string;
@Prop() notes?: string;
@Prop() openTime?: string;
@Prop() contactId?: number
}
export class EmailCreateDto
{
@Prop({ enum: P.$Enums.ContactType,required: true }) contactType: P.$Enums.ContactType;
@Prop({ required: true }) email: string;
@Prop() notes?: string;
@Prop() openTime?: string;
@Prop({ required: true }) contactId: number
}
export class EmailUpdateDto extends PartialType(EmailCreateDto) {}