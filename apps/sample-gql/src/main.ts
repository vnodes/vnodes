import { boot } from '@vnodes/boot-express';
import { AppModule } from './app.module.js';

export async function main() {
    await boot({ module: AppModule, graphql: true }, {}, []);
}
