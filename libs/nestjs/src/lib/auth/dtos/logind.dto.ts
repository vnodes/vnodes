import { Prop } from '../../custom/index.js';

export class LoginDto {
    @Prop({ required: true, format: 'email' }) username: string;
    @Prop({ required: true, format: 'password' }) password: string;
}
export class LoginResponseDto {
    constructor(public readonly token: string) {}
}
