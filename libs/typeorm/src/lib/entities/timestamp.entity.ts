import { Column } from '../decorators/column.js';
import { IdEntity } from './id.entity.js';

export class TimestampEntity extends IdEntity {
    @Column({ type: 'date', timestamp: 'created-at', required: false }) createdAt: Date;
    @Column({ type: 'date', timestamp: 'updated-at', required: false }) updatedAt: Date;
    @Column({ type: 'date', timestamp: 'deleted-at', required: false }) deletedAt?: Date;
}
