import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';
import * as P from '../prisma/index.js';

export class ContactQueryDto implements P.QueryMany<P.Prisma.ContactScalarFieldEnum> {
    @Prop() take?: number;
    @Prop() skip?: number;
    @Prop() search?: string;
    @Prop({ enum: P.Prisma.ContactScalarFieldEnum }) orderBy?: P.Prisma.ContactScalarFieldEnum;
    @Prop({ enum: P.Prisma.SortOrder }) orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}

export class ContactReadDto {
    @Prop() id?: number;
    @Prop() uuid?: string;
    @Prop() createdAt?: Date;
    @Prop() updatedAt?: Date;
    @Prop() deletedAt?: Date;
    @Prop() firstName?: string;
    @Prop() lastName?: string;
    @Prop() middleName?: string;
    @Prop() preferedName?: string;
    @Prop({ enum: P.$Enums.Gender }) gender?: P.$Enums.Gender;
    @Prop({ type: [String] }) profiles?: string[];
    @Prop() primaryEmailId?: number;
    @Prop() primaryPhoneId?: number;
    @Prop() primaryAddressId?: number;
}
export class ContactCreateDto {
    @Prop({ required: true }) firstName: string;
    @Prop({ required: true }) lastName: string;
    @Prop() middleName?: string;
    @Prop() preferedName?: string;
    @Prop({ enum: P.$Enums.Gender }) gender?: P.$Enums.Gender;
    @Prop({ type: [String] }) profiles?: string[];
    @Prop() primaryEmailId?: number;
    @Prop() primaryPhoneId?: number;
    @Prop() primaryAddressId?: number;
}
export class ContactUpdateDto extends PartialType(ContactCreateDto) {}
