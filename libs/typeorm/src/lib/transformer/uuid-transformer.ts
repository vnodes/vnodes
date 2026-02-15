import type { ValueTransformer } from 'typeorm';
import { v7 } from 'uuid';

export class UuidTransformer implements ValueTransformer {
    from(value: string) {
        return value;
    }
    to() {
        return v7();
    }
}
