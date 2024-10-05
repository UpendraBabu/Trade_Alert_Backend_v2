import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class User {
  name: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  launcher(): string {
    return this.appService.launcher();
  }

  @Post('json')
  tradeAlertJson(@Body() payload: User) {
    return this.appService.tradeAlertJson(payload);
  }

  @Post()
  tradeAlertMessage() {
    return this.appService.tradeAlertMessage();
  }
}
