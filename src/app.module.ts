import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeData, TradeDataSchema } from './schema/tradeData.schema';
import {
  TradeDataString,
  TradeDataStringSchema,
} from './schema/tradeSchema.string.dto';
import { ConfigModule } from '@nestjs/config';
import { Counter, CounterSchema } from './schema/counter.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: TradeData.name, schema: TradeDataSchema },
      { name: TradeDataString.name, schema: TradeDataStringSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
