import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class TodoUpdateDto
{
@Prop({ type: String,required: false,minLength: 3,maxLength: 255 })
title? : string;
@Prop({ type: String,required: false,maxLength: 400 })
description? : string;
@Prop({ type: String,required: false,enum: P.$Enums.Status })
status? : P.$Enums.Status;
@Prop({ type: Number,required: false })
score? : number;
@Prop({ type: [String],required: false,maxItems: 3 })
tags? : string[];
@Prop({ type: Object,required: false })
details? : string
}