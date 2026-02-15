import { Column } from '../decorators/column.js';

export class IdEntity {
    @Column({ type: 'integer', primaryId: true, required: false }) id: number;
}
