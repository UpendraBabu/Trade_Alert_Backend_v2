import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './app.controller';
import { InjectModel } from '@nestjs/mongoose';
import { TradeData } from './schema/tradeData.schema';
import { Model } from 'mongoose';
import { CreateTradeDataDto } from './dto/create-data.dto';
import { TradeDataString } from './schema/tradeSchema.string.dto';
import { CreateTradeDataStringDto } from './dto/createStringData.dto';

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
    console.log({ newUser });

    return await newUser.save();
  }

  async getTradeAlert(): Promise<TradeDataString[]> {
    const trades = await this.tradeStringModule.find().exec();
    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    return trades;
  }

  async pagination(range: string) {
    const [ll, ul] = range.split('-');
    const limit = Number(ul) - Number(ll) + 1; // Limit the results
    const skip = Number(ll) - 1;
    const trades = await this.tradeStringModule
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    if (trades.length === 0) {
      throw new NotFoundException('No Datas found');
    }
    return trades;
    // return { upperLimit: upperLimit, lowerLimit: lowerLimit };
  }
}
