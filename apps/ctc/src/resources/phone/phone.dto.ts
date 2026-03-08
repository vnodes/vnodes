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

export class PhoneReadDto {
    @Prop() id?: number;
    @Prop() createdAt?: Date;
    @Prop() updatedAt?: Date;
    @Prop() deletedAt?: Date;
    @Prop({ enum: P.$Enums.PersonalOrWork }) contactType?: P.$Enums.PersonalOrWork;
    @Prop() phone?: string;
    @Prop() notes?: string;
    @Prop() openTime?: string;
    @Prop() contactId?: number;
}
export class PhoneCreateDto {
    @Prop({ required: true }) contactType: P.$Enums.PersonalOrWork;
    @Prop({ required: true }) phone: string;
    @Prop() notes?: string;
    @Prop() openTime?: string;
    @Prop({ required: true }) contactId: number;
}
export class PhoneUpdateDto extends PartialType(PhoneCreateDto) {}
