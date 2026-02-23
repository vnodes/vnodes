import { Prop } from '@vnodes/property';

export class AccessTokenReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) name: string;
    @Prop({ required: false }) description?: string;
    @Prop({}) token: string;
}
