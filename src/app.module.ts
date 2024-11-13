import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradesModule } from './trades/trades.module';
import { Trade } from './trades/entities/trade.entity';

// const type = process.env.DB_TYPE;
// const url = process.env.DB_URL;
// const port = process.env.DB_PORT;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const database = process.env.DB_DATABASE;

// console.log(type, url, port, username, password, database);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_URL,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Trade],
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false, // This allows connections to self-signed certificates
      },
    }),
    TradesModule,
    TypeOrmModule.forFeature([Trade]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
