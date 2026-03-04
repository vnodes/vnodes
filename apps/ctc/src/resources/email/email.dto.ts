
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

export class EmailReadDto
{
@Prop() id?: number;
@Prop() createdAt?: Date;
@Prop() updatedAt?: Date;
@Prop() deletedAt?: Date;
@Prop({ enum: P.$Enums.PersonalOrWork }) contactType?: P.$Enums.PersonalOrWork;
@Prop() email?: string;
@Prop() notes?: string;
@Prop() openTime?: string;
@Prop() contactId?: number
}
export class EmailCreateDto
{
@Prop({ required: true,enum: P.$Enums.PersonalOrWork }) contactType: P.$Enums.PersonalOrWork;
@Prop({ required: true }) email: string;
@Prop() notes?: string;
@Prop() openTime?: string;
@Prop({ required: true }) contactId: number
}
export class EmailUpdateDto extends PartialType(EmailCreateDto) {}