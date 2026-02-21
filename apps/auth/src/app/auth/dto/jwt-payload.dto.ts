import { Prop } from '@vnodes/property';

export class JwtPayloadDto {
    /**
     * Sesion id
     */
    @Prop() sub: number;

    /**
     * Permission ids as string
     */
    @Prop() permissions: number[];
}
