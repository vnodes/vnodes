import { PropOptional } from '../property/optional-prop.js';

export enum YesNo {
    Yes = 'Yes',
    No = 'No',
}

export class BaseQueryDto {
    @PropOptional({ format: 'int32', minimum: 0, default: 20 }) take?: number;
    @PropOptional({ format: 'int32', minimum: 0, default: 0 }) skip?: number;
    @PropOptional() search?: string;
    @PropOptional({ enum: YesNo }) withDeleted?: YesNo;
}
