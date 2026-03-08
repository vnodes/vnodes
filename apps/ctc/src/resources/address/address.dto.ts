import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';

import * as P from '../prisma/index.js';

export class AddressQueryDto implements P.QueryMany<P.Prisma.AddressScalarFieldEnum> {
    @Prop() take?: number;
    @Prop() skip?: number;
    @Prop() search?: string;
    @Prop() orderBy?: P.Prisma.AddressScalarFieldEnum;
    @Prop() orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}

export class AddressReadDto {
    @Prop() id?: number;
    @Prop() createdAt?: Date;
    @Prop() updatedAt?: Date;
    @Prop() deletedAt?: Date;
    @Prop({ enum: P.$Enums.ContactType }) contactType?: P.$Enums.ContactType;
    @Prop() street?: string;
    @Prop() city?: string;
    @Prop() notes?: string;
    @Prop() openTime?: string;
    @Prop() unit?: string;
    @Prop() province?: string;
    @Prop() state?: string;
    @Prop() country?: string;
    @Prop() zip?: string;
    @Prop() contactId?: number;
}
export class AddressCreateDto {
    @Prop({ required: true }) contactType: P.$Enums.ContactType;
    @Prop({ required: true }) street: string;
    @Prop({ required: true }) city: string;
    @Prop() notes?: string;
    @Prop() openTime?: string;
    @Prop() unit?: string;
    @Prop() province?: string;
    @Prop() state?: string;
    @Prop() country?: string;
    @Prop() zip?: string;
    @Prop({ required: true }) contactId: number;
}
export class AddressUpdateDto extends PartialType(AddressCreateDto) {}
