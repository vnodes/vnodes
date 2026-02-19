import { Prop } from '@vnodes/property';

export class UserCreateDto {
    @Prop({ type: Number, maximum: 16000 })
    salary: number;
    @Prop({ type: Object, required: false })
    attributes?: string;
    @Prop({ type: [String] })
    tags: string[];
}
