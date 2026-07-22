import { Prop } from '@vnodes/prop';

export class BaseQueryDto {
  @Prop({ default: 20 }) take?: number;
  @Prop({ default: 0 }) skip?: number;
  @Prop() search?: string;
}
