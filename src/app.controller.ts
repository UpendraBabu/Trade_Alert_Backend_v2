import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTradeDataDto } from './dto/create-data.dto';

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

  // Json Format
  @Post('trades')
  saveTrades(@Body() tradeData: CreateTradeDataDto) {
    return this.appService.saveTrades(tradeData);
  }

  @Get('trades')
  getTrades() {
    return this.appService.getTrades();
  }

  // String Format
  @Post('_trades')
  saveTradesString(@Body() tradeData: any) {
    return this.appService.saveTradesString(tradeData);
  }

  @Get('_trades')
  getTradesString() {
    return this.appService.getTradesString();
  }
}
