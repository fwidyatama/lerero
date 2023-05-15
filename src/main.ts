import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { BasicTokenMiddleware } from './middleware/authenticate.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  app.use(BasicTokenMiddleware);

  await app.listen(3000);
}
bootstrap();
