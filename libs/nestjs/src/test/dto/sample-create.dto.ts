import { Prop } from '../../lib/custom/decorators/prop.js';

export class SampleCreateDto {
    @Prop() stringValue: string;
    @Prop() numberValue: number;
    @Prop() booleanValue: boolean;
    @Prop() dateValue: Date;
    @Prop() stringArrayValue: string[];
    @Prop() numberArrayValue: number[];
    @Prop() booleanArrayValue: boolean[];
}
