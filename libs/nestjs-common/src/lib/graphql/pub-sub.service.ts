import { PubSub } from '@vnodes/graphql';
import { Injectable } from '@vnodes/nestjs/common';
import type { Any } from '@vnodes/types';

@Injectable()
export class PubSubService<T extends Record<string, Any> = Record<string, Any>> extends PubSub<T> {}
