import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTradeDataDto } from './dto/create-data.dto';
import { Range } from './dto/range.dto';

export class User {
  name: string;
}

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  // @Get()
  // launcher(): string {
  //   return this.appService.launcher();
  // }
  // // @Post('json')
  // // tradeAlertJson(@Body() payload: User) {
  // //   return this.appService.tradeAlertJson(payload);
  // // }
  // // Json Format
  // @Post('saveTrades')
  // saveTrades(@Body() tradeData: CreateTradeDataDto) {
  //   return this.appService.saveTrades(tradeData);
  // }
  // @Get('getTrades')
  // getTrades() {
  //   return this.appService.getTrades();
  // }
  // // String Format
  // @Post('saveTradeAlert')
  // saveTradeAlert(@Body() tradeData: any) {
  //   return this.appService.saveTradeAlert(tradeData);
  // }
  // @Get('getTradeAlert')
  // getTradeAlert() {
  //   return this.appService.getTradeAlert();
  // }
  // // Pagination
  // @Post('getTradeAlert/v2')
  // getTradesByRange(@Body() data: Range) {
  //   return this.appService.pagination(data);
  // }
  // @Get('range/:ll/:ul')
  // getTradesByPage(@Param('ll') ll: string, @Param('ul') ul: string) {
  //   return this.appService.fetchByRange(ll, ul);
  // }
  // @Get('date/:start/:end')
  // getTradesByDate(
  //   @Param('start') staringDate: string,
  //   @Param('end') endingDate: string,
  // ) {
  //   return this.appService.fetchByDate(staringDate, endingDate);
  // }
  // @Get('epoch/:time')
  // getTime(@Param() time: any) {
  //   return this.appService.getTime(time);
  // }
}
