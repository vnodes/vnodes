import { env } from '@vnodes/env';
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: env.DB_PRISMA_SCHEMA_PATH_OR_DEFAULT,
  migrations: {
    path: env.DB_MIGRATIONS_PATH_OR_DEFAULT,
  },
  datasource: {
    url: env.DB_URL_OR_THROW,
  },
});
