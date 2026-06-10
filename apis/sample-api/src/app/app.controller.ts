import { Controller, Get } from '@nestjs/common';

@Controller('apps')
export class AppController {
  @Get('hello')
  hello() {
    return { message: 'Hello' };
  }
}
