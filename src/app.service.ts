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
import { Counter } from './schema/counter.schema';
import { ReturnData } from './Utils/globalData';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(TradeData.name)
    private tradeModule: Model<TradeData>,

    @InjectModel(TradeDataString.name)
    private tradeStringModule: Model<TradeDataString>,

    @InjectModel(Counter.name)
    private counter: Model<Counter>,
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
    const returnData = new ReturnData();
    const epochTime = Date.now();
    tradeData.createdAt = JSON.stringify(epochTime);
    tradeData.updatedAt = JSON.stringify(epochTime);
    this.saveToDb(tradeData);
    console.log('data recieved');
    returnData.error = null;
    returnData.message = 'Data recieved';
    return returnData;
  }

  async getId(dbName: string) {
    const data = await this.counter.findOne({ db: dbName });
    if (data) {
      const id = data.id + 1;
      await this.counter.updateOne({ db: dbName }, { id });
      return id;
    } else {
      const id = 1;
      await this.counter.insertMany({ db: dbName, id });
      return id;
    }
  }

  async saveToDb(tradeData: CreateTradeDataDto) {
    const newUser = new this.tradeModule(tradeData);
    return await newUser.save();
  }

  async getTrades(): Promise<ReturnData> {
    const returnData = new ReturnData();
    const trades = await this.tradeModule.find().exec();
    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    returnData.error = null;
    returnData.message = 'All Data fetched';
    returnData.value = trades;
    return returnData;
  }

  // String Format
  saveTradeAlert(tradeData: any) {
    const returnData = new ReturnData();
    const epochTime = Date.now();

    const stringData: CreateTradeDataStringDto = {
      id: null,
      data: JSON.stringify(tradeData),
      createdAt: JSON.stringify(epochTime),
      updatedAt: JSON.stringify(epochTime),
    };
    this.saveToDbString(stringData);
    returnData.error = null;
    returnData.message = 'Data recieved';
    return returnData;
  }

  async saveToDbString(stringData: CreateTradeDataStringDto) {
    const uniqueId = await this.getId('tradeId');
    stringData.id = uniqueId;
    const newUser = new this.tradeStringModule(stringData);
    return await newUser.save();
  }

  async getTradeAlert(): Promise<ReturnData> {
    const returnData = new ReturnData();
    const trades = await this.tradeStringModule.find().exec();
    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    returnData.error = null;
    returnData.message = 'All Data fetched';
    returnData.value = trades;
    return returnData;
  }

  async pagination(data: Range) {
    const returnData = new ReturnData();
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
    returnData.error = null;
    returnData.message = 'Filtered Datas as per the provided Filter';
    returnData.value = trades;
    return returnData;
  }

  async fetchByRange(ll: string, ul: string) {
    const returnData = new ReturnData();
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

      if (trades.length === 0) {
        throw new NotFoundException('No Datas found');
      }

      returnData.error = null;
      returnData.message = 'Filtered Datas as per the provided Range';
      returnData.value = trades;
    }
  }

  async fetchByDate(start: string, end: string) {
    const returnData = new ReturnData();
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

    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }

    returnData.error = null;
    returnData.message = 'Filtered Datas as per the provided Date range';
    returnData.value = trades;
  }
}
