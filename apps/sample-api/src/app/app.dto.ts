import { Prop } from '@vnodes/nestjs';
import { PartialType, PickType } from '@vnodes/nestjs/swagger';

export class AppDto {
    @Prop({ required: true }) id: number;
    @Prop({ required: true }) name: string;
}
export class AppCreateDto extends PickType(AppDto, ['name']) {}

export class AppUpdateDto extends PartialType(AppCreateDto) {}

export class AppQueryDto {
    @Prop({ minimum: 1 }) take?: number;
    @Prop({ minimum: 0 }) skip?: number;
    @Prop() search?: string;
}
