import { Prop } from '@vnodes/property';

export class PermissionCreateDto {
    @Prop({}) app: string;
    @Prop({}) resource: string;
    @Prop({}) operation: string;
}
