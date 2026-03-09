import { Prop } from '@vnodes/nestjs';
import { PartialType } from '@vnodes/nestjs/swagger';
import * as EmailDtos from '../email/email.dto.js'
import * as PhoneDtos from '../phone/phone.dto.js'
import * as AddressDtos from '../address/address.dto.js'
import * as P from '../prisma/index.js';

export class ContactQueryDto implements P.QueryMany<P.Prisma.ContactScalarFieldEnum> {
    @Prop() take?: number;
    @Prop() skip?: number;
    @Prop() search?: string;
    @Prop() orderBy?: P.Prisma.ContactScalarFieldEnum;
    @Prop() orderDir?: P.Prisma.SortOrder;
    @Prop() withDeleted?: boolean;
}

export class ContactReadDto
{
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
@Prop({ type: EmailDtos.EmailReadDto }) primaryEmail?: EmailDtos.EmailReadDto;
@Prop() primaryEmailId?: number;
@Prop({ type: PhoneDtos.PhoneReadDto }) primaryPhone?: PhoneDtos.PhoneReadDto;
@Prop() primaryPhoneId?: number;
@Prop({ type: AddressDtos.AddressReadDto }) primaryAddress?: AddressDtos.AddressReadDto;
@Prop() primaryAddressId?: number;
@Prop({ type: [EmailDtos.EmailReadDto] }) emails?: EmailDtos.EmailReadDto[];
@Prop({ type: [PhoneDtos.PhoneReadDto] }) phones?: PhoneDtos.PhoneReadDto[];
@Prop({ type: [AddressDtos.AddressReadDto] }) addresses?: AddressDtos.AddressReadDto[]
}
export class ContactCreateDto
{
@Prop({ required: true }) firstName: string;
@Prop({ required: true }) lastName: string;
@Prop() middleName?: string;
@Prop() preferedName?: string;
@Prop({ enum: P.$Enums.Gender }) gender?: P.$Enums.Gender;
@Prop({ type: [String] }) profiles?: string[];
@Prop() primaryEmailId?: number;
@Prop() primaryPhoneId?: number;
@Prop() primaryAddressId?: number
}
export class ContactUpdateDto extends PartialType(ContactCreateDto) {}