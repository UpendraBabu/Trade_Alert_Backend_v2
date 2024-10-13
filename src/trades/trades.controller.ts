import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Range } from './dto/range.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  createV2(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.createV2(createTradeDto);
  }

  @Get()
  findAllV2() {
    return this.tradesService.findAllV2();
  }

  @Get(':id')
  findOneV2(@Param('id') id: string) {
    return this.tradesService.findOneV2(+id);
  }

  @Post('/v2')
  pagination(@Body() data: Range) {
    return this.tradesService.pagination(data);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
  //   return this.tradesService.update(+id, updateTradeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tradesService.remove(+id);
  // }

  @Delete('flush')
  remove() {
    return this.tradesService.remove();
  }
}
