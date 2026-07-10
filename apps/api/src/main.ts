import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  const apiUrl = process.env.API_PUBLIC_URL ?? `http://localhost:${port}/api`;
  const webUrl = process.env.WEB_PUBLIC_URL ?? 'http://localhost:5173';
  const logger = new Logger('Bootstrap');
  logger.log(`API ready at ${apiUrl}`);
  logger.log(`Web ready at ${webUrl}`);
}

void bootstrap();
