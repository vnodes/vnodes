import { Prop } from '@vnodes/property';

import * as P from '../../../prisma/client.js';

export class TodoCreateDto {
    @Prop({ minLength: 3, maxLength: 255 }) title: string;
    @Prop({ maxLength: 400 }) description: string;
    @Prop({ enum: P.$Enums.Status }) status?: P.$Enums.Status;
    @Prop({}) score: number;
    @Prop({ type: [String], maxItems: 3 }) tags?: string[];
    @Prop({ required: false }) createdById?: number;
}
