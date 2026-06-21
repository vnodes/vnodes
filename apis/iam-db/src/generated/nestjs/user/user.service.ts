import type { Prisma } from '../../prisma/browser.js';

export class UserService {
  constructor(protected readonly delegate: Prisma.UserDelegate) {}
}
