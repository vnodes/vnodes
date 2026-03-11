import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';

import * as P from '../prisma/index.js';

export class EmailQueryDto implements P.QueryMany<P.Prisma.EmailScalarFieldEnum> {
    @Prop() take?: number;
    @Prop() skip?: number;
    @Prop() search?: string;
    @Prop() orderBy?: P.Prisma.EmailScalarFieldEnum;
    @Prop() orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}

export class EmailReadDto {
    @Prop() id?: number;
    @Prop() createdAt?: Date;
    @Prop() updatedAt?: Date;
    @Prop() deletedAt?: Date;
    @Prop({ enum: P.$Enums.ContactType }) contactType?: P.$Enums.ContactType;
    @Prop() email?: string;
    @Prop() notes?: string;
    @Prop() openTime?: string;
    @Prop() contactId?: number;
}
export class EmailCreateDto {
    @Prop({ enum: P.$Enums.ContactType, required: true }) contactType: P.$Enums.ContactType;
    @Prop({ required: true }) email: string;
    @Prop() notes?: string;
    @Prop() openTime?: string;
    @Prop({ required: true }) contactId: number;
}
export class EmailUpdateDto extends PartialType(EmailCreateDto) {}
