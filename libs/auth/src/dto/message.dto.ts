import { Prop } from '@vnodes/property';

export class MessageDto {
    @Prop() message: string;

    constructor(data: MessageDto) {
        Object.assign(this, data);
    }
}
