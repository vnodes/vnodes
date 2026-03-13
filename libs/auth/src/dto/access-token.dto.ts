import { Prop } from '@vnodes/property';

export class AccessTokenDto {
    @Prop() token: string;

    constructor(dto: AccessTokenDto) {
        Object.assign(this, dto);
    }
}
