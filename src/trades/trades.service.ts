import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Repository } from 'typeorm';
import { Trade } from './entities/trade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnData } from 'src/Utils/globalData';
import { Range } from './dto/range.dto';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradesRepository: Repository<Trade>,
  ) {}

  createV2(createTradeDto: CreateTradeDto) {
    const returnData = new ReturnData();
    const epochTime = Date.now();

    const stringData: CreateTradeDto = {
      data: JSON.stringify(createTradeDto),
      createdAt: JSON.stringify(epochTime),
      updatedAt: JSON.stringify(epochTime),
    };
    console.log('Data recieved');

    this.saveToDbString(stringData);
    returnData.error = null;
    returnData.message = 'Data recieved';
    return returnData;
  }

  async saveToDbString(stringData: CreateTradeDto) {
    const newData = await this.tradesRepository.save(stringData);
    console.log('New Data stored: ', newData);
  }

  async findAllV2() {
    const returnData = new ReturnData();
    const count = await this.tradesRepository.count();
    if (count === 0) {
      throw new NotFoundException('No Datas found');
    }
    const trades = await this.tradesRepository.find();
    returnData.error = null;
    returnData.message = 'All Data fetched';
    returnData.value = { totalCount: count, data: trades };
    return returnData;
  }

  async findOneV2(id: number) {
    const returnData = new ReturnData();
    const trades = await this.tradesRepository.findOneByOrFail({ id: id });
    returnData.error = null;
    returnData.message = 'Data fetched';
    returnData.value = trades;
    return returnData;
    return `This action returns a #${id} trade`;
  }

  async pagination(data: Range) {
    console.log('Queried Range: ', data);
    const returnData = new ReturnData();

    if (data.lowerLimit > data.upperLimit) {
      returnData.error = true;
      returnData.message = "Lower limit can't be greater than Upper Limit";
      // returnData.value = 404;
      // throw new BadRequestException(
      //   "Lower limit can't be greater than Upper Limit",
      // );
    }
    if (data.startingDate > data.endingDate) {
      returnData.error = true;
      returnData.message = "Lower limit can't be greater than Upper Limit";
      // returnData.value = 404;
      return returnData;
      // throw new BadRequestException(
      //   "Starting date can't be later than Ending Date",
      // );
    }
    const count = await this.tradesRepository.count();
    if (count === 0) {
      returnData.error = true;
      returnData.message = 'No Datas found';
      return returnData;
      // throw new NotFoundException('No Datas found');
    }

    const startingDate = data.startingDate || 1727740800000;
    const endingDate = data.endingDate || 33284649600000;
    const ll = data.lowerLimit || 1;
    const ul = data.upperLimit || 10;
    const limit = ul - ll + 1;
    var skip: number = ll - 1;

    if (skip < 1) {
      skip = null;
    }

    const trades = await this.tradesRepository
      .createQueryBuilder('trade')
      .where('trade.createdAt >= :startingDate', { startingDate })
      .andWhere('trade.createdAt <= :endingDate', { endingDate })
      .skip(skip)
      .take(limit)
      .getMany();

    if (trades.length === 0) {
      console.log('Filtered content length: ', trades.length);

      returnData.error = true;
      returnData.message = 'No Datas found for the given filter';
      // returnData.value = 404;
      return returnData;
      // throw new NotFoundException('No Datas found');
    }

    returnData.error = null;
    returnData.message = 'Filtered Datas as per the provided Filter';
    returnData.value = { totalCount: count, data: trades };
    return returnData;
  }

  // update(id: number, updateTradeDto: UpdateTradeDto) {
  //   return `This action updates a #${id} trade`;
  // }

  // remove(id: number,) {
  //   return `This action deletes a #${id} trade`;
  // }

  async remove() {
    try {
      // Run the raw SQL query using the repository's query() method
      await this.tradesRepository.query(
        'TRUNCATE TABLE trade RESTART IDENTITY;',
      );
      return 'Table truncated and identity reset.';
    } catch (err) {
      throw new Error(`Failed to truncate table: ${err.message}`);
    }
  }
}
