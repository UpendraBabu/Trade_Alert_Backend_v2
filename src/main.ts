import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT);
  // console.log(typeof port);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
