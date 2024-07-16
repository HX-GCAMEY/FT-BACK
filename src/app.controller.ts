import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //req.body , req, params
    return this.appService.getHello(); // esta es la respuesta
  }

  // @Post()
  // postHello() {
  //   return this.appService.postHello();
  // }
}
