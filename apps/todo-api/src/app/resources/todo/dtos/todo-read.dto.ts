import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class TodoReadDto
{
@Prop({ type: Number }) id?: number;
@Prop({ type: String }) uuid?: string;
@Prop({ type: Date }) createdAt?: Date;
@Prop({ type: Date }) updatedAt: Date;
@Prop({ type: Date,required: false }) deletedAt?: Date;
@Prop({ type: String,minLength: 3,maxLength: 255 }) title: string;
@Prop({ type: String,maxLength: 400 }) description: string;
@Prop({ type: String,enum: P.$Enums.Status }) status?: P.$Enums.Status;
@Prop({ type: Number }) score: number;
@Prop({ type: [String],maxItems: 3 }) tags?: string[];
@Prop({ type: Object,required: false }) details?: string;
@Prop({ type: Number }) createdById: number
}