import { Prop } from '@vnodes/property';

export class AddressUpdateDTo {
    @Prop({ type: String, required: false, description: 'Explanation for the addresss' })
    lable?: string;
    @Prop({ type: String, required: false })
    street?: string;
    @Prop({ type: String, required: false, maximum: 255, minimum: 3 })
    city?: string;
    @Prop({ type: String, required: false, maximum: 255, minimum: 3 })
    state?: string;
    @Prop({ type: String, required: false, maximum: 255, minimum: 3 })
    country?: string;
    @Prop({ type: String, required: false, maximum: 30, minimum: 3 })
    zip?: string;
    @Prop({ type: String, required: false, description: 'Address description' })
    notes?: string;
}
