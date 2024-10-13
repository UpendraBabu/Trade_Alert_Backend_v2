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
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradesModule } from './trades/trades.module';
import { Trade } from './trades/entities/trade.entity';

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cs5ljndumphs73avc4eg-a.oregon-postgres.render.com',
      port: 5432,
      password: 'RDAKoDocuszwNzZ5hbe79nXRV1nPQEaK',
      username: 'super_user',
      entities: [Trade],
      database: 'trade_alert',
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false, // This allows connections to self-signed certificates
      },
    }),
    TradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
