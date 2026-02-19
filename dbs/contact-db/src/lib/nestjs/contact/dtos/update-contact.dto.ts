import { Prop } from '@vnodes/property';
import type * as P from '../../../client/client.js';

export class ContactUpdateDTo {
    @Prop({ type: String, required: false })
    uuid?: string;
    @Prop({ type: String, required: false })
    firstName?: string;
    @Prop({ type: String, required: false })
    lastName?: string;
    @Prop({ type: String, required: false })
    middleName?: string;
    @Prop({ type: String, required: false })
    gender?: P.Gender;
    @Prop({ type: String, required: false })
    company?: string;
    @Prop({ type: String, required: false })
    occupation?: string;
}
