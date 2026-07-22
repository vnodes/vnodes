import { bootstrap as __bootstrap } from '@vnodes/nest';
import { AppModule } from './app.module.js';

export function bootstrap() {
  __bootstrap({ module: AppModule }, {});
}
