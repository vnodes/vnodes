import { Prop } from '../../property/index.js';

export class LoginDto {
    @Prop({ required: true, format: 'email' }) username: string;
    @Prop({ required: true, format: 'password' }) password: string;
}

export class LoginResponseDto {
    @Prop() token: string;

    constructor(token: string) {
        this.token = token;
    }
}
