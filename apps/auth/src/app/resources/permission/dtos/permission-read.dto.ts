import { Prop } from '@vnodes/property';

export class PermissionReadDto {
    @Prop({}) id?: number;
    @Prop({}) scope: string;
    @Prop({}) resource: string;
    @Prop({}) operation: string;
}
