import { Prop } from '@vnodes/property';
import type * as P from '../../../client/client.js';

export class ContactCreateDto {
    @Prop({ type: String })
    uuid: string;
    @Prop({ type: String })
    firstName: string;
    @Prop({ type: String })
    lastName: string;
    @Prop({ type: String, required: false })
    middleName?: string;
    @Prop({ type: String, required: false })
    gender?: P.Gender;
    @Prop({ type: String, required: false })
    company?: string;
    @Prop({ type: String, required: false })
    occupation?: string;
}
