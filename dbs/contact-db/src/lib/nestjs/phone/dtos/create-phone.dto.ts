import { Prop } from '@vnodes/property';
import type * as P from '../../../client/client.js';

export class PhoneCreateDto {
    @Prop({ type: String, required: false })
    label?: string;
    @Prop({ type: String })
    value: string;
    @Prop({ type: String, required: false })
    notes?: string;
    @Prop({ type: String })
    contactType?: P.ContactType;
    @Prop({ type: Number })
    contactId: number;
}
