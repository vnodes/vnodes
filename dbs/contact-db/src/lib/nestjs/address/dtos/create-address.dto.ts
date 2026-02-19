import { Prop } from '@vnodes/property';
import type * as P from '../../../client/client.js';

export class AddressCreateDto {
    @Prop({ type: String, required: false, description: 'Explanation for the addresss' })
    lable?: string;
    @Prop({ type: String })
    street: string;
    @Prop({ type: String, maximum: 255, minimum: 3 })
    city: string;
    @Prop({ type: String, maximum: 255, minimum: 3 })
    state: string;
    @Prop({ type: String, maximum: 255, minimum: 3 })
    country: string;
    @Prop({ type: String, maximum: 30, minimum: 3 })
    zip: string;
    @Prop({ type: String, required: false, description: 'Address description' })
    notes?: string;
    @Prop({ type: String })
    contactType?: P.ContactType;
    @Prop({ type: Number })
    contactId: number;
}
