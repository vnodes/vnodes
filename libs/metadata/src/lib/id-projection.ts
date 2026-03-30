import { SetMetadata } from '@nestjs/common';
import { Meta } from '@vnodes/env';

/**
 * Operations with IdProjection metadata will NOT return the entire payload of the result but the id property only
 *
 * @returns -- Decorator
 */
export const IdProjection = () => SetMetadata(Meta.ID_PROJECTION, true);
