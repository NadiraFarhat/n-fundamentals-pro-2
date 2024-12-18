import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //added the global pipes from the class-validation package
  await app.listen(process.env.PORT ?? 4000); // changed the port from 3000 to 4000 🥲
}
bootstrap();
