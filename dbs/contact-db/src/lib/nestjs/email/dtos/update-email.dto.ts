import { Prop } from '@vnodes/property';
import type * as P from '../../../client/client.js';

export class EmailUpdateDTo {
    @Prop({ type: String, required: false })
    label?: string;
    @Prop({ type: String, required: false })
    value?: string;
    @Prop({ type: String, required: false })
    notes?: string;
    @Prop({ type: String, required: false })
    contactType?: P.ContactType;
    @Prop({ type: Number, required: false })
    contactId?: number;
}
