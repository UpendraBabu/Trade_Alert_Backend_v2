import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  // @Post('json')
  // tradeAlertJson(@Body() payload: User) {
  //   return this.appService.tradeAlertJson(payload);
  // }

  // Json Format
  @Post('saveTrades')
  saveTrades(@Body() tradeData: CreateTradeDataDto) {
    return this.appService.saveTrades(tradeData);
  }

  @Get('getTrades')
  getTrades() {
    return this.appService.getTrades();
  }

  // String Format
  @Post('saveTradeAlert')
  saveTradeAlert(@Body() tradeData: any) {
    return this.appService.saveTradeAlert(tradeData);
  }

  @Get('getTradeAlert')
  getTradeAlert() {
    return this.appService.getTradeAlert();
  }

  // Pagination
  @Get('page/:range')
  getTradesByRange(@Param('range') range: string) {
    return this.appService.pagination(range);
  }

  // Pagination
  @Get('date/:date')
  getTradesByDate(@Param('date') range: string) {
    return this.appService.fetchByDate(range);
  }
}
