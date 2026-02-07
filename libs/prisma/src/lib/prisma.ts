/**
 * Some doc
 */
export class Sample {
    constructor(protected readonly some: string) {}

    /**
     * Some doc
     * @returns string
     */
    who() {
        return this.some;
    }
}

export function prisma(): string {
    return "prisma";
}
