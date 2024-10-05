import { Injectable } from '@nestjs/common';
import { User } from './app.controller';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  launcher() {
    console.log('CBOE Alert Test');
    return 'CBOE Alert Test';
  }

  tradeAlertJson(payload: User) {
    console.log('Post payload: ', payload);
    return payload;
  }

  tradeAlertMessage() {
    return 'Payment Successfull';
  }
}
