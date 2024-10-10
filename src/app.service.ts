import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './app.controller';
import { InjectModel } from '@nestjs/mongoose';
import { TradeData } from './schema/tradeData.schema';
import { Model } from 'mongoose';
import { CreateTradeDataDto } from './dto/create-data.dto';
import { TradeDataString } from './schema/tradeSchema.string.dto';
import { CreateTradeDataStringDto } from './dto/createStringData.dto';
import { Range } from './dto/range.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(TradeData.name) private tradeModule: Model<TradeData>,
    @InjectModel(TradeDataString.name)
    private tradeStringModule: Model<TradeDataString>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  launcher() {
    console.log('CBOE Alert Test');
    return 'CBOE Alert Test';
  }

  // tradeAlertJson(payload: User) {
  //   console.log('Post payload: ', payload);
  //   return payload;
  // }

  //JSON Format
  saveTrades(tradeData: CreateTradeDataDto) {
    const epochTime = Date.now();
    tradeData.createdAt = JSON.stringify(epochTime);
    tradeData.updatedAt = JSON.stringify(epochTime);
    this.saveToDb(tradeData);
    console.log('data recieved');
    return 'Data recieved';
  }

  async saveToDb(tradeData: CreateTradeDataDto) {
    const newUser = new this.tradeModule(tradeData);
    return await newUser.save();
  }

  async getTrades(): Promise<TradeData[]> {
    const trades = await this.tradeModule.find().exec();
    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    return trades;
  }

  // String Format
  saveTradeAlert(tradeData: any) {
    const epochTime = Date.now();

    const stringData: CreateTradeDataStringDto = {
      id: tradeData.id,
      data: JSON.stringify(tradeData),
      createdAt: JSON.stringify(epochTime),
      updatedAt: JSON.stringify(epochTime),
    };
    this.saveToDbString(stringData);
    console.log('data recieved');
    return 'Data recieved';
  }

  async saveToDbString(stringData: CreateTradeDataStringDto) {
    const newUser = new this.tradeStringModule(stringData);
    return await newUser.save();
  }

  async getTradeAlert(): Promise<TradeDataString[]> {
    const trades = await this.tradeStringModule.find().exec();
    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    return trades;
  }

  async pagination(data: Range) {
    if (data.lowerLimit > data.upperLimit)
      throw new BadRequestException(
        "Lower limit can't be greater than Upper Limit",
      );
    if (data.startingDate > data.endingDate)
      throw new BadRequestException(
        "Starting date can't be later than Ending Date",
      );

    const startingDate = data.startingDate || 1727740800000;
    const endingDate = data.endingDate || 33284649600000;
    const ll = data.lowerLimit || 1;
    const ul = data.upperLimit || 10;
    const limit = ul - ll + 1;
    var skip: number = ll - 1;

    if (skip < 1) {
      skip = null;
    }

    const trades = await this.tradeStringModule
      .find({
        createdAt: {
          $gte: startingDate,
          $lte: endingDate,
        },
      })
      .skip(skip)
      .limit(limit)
      .exec();

    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    return trades;
  }

  async fetchByRange(ll: string, ul: string) {
    const lowerLimit = parseInt(ll);
    const upperLimit = parseInt(ul);

    if (lowerLimit > upperLimit) {
      throw new BadRequestException(
        "Lower limit can't be greater than Upper Limit",
      );
    } else {
      const limit = upperLimit - lowerLimit + 1;
      var skip = lowerLimit - 1;

      if (skip < 1) {
        skip = null;
      }

      const trades = await this.tradeStringModule
        .find()
        .skip(skip)
        .limit(limit);

      return trades;
    }
  }

  async fetchByDate(start: string, end: string) {
    const startingDate = parseInt(start);
    const endingDate = parseInt(end);
    if (startingDate > endingDate)
      throw new BadRequestException(
        "Starting date can't be later than Ending Date",
      );

    const trades = await this.tradeStringModule.find({
      createdAt: {
        $gte: startingDate,
        $lte: endingDate,
      },
    });

    return trades;
  }
}
