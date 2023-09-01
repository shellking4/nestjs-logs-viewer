import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appLogger } from './log/commons/app-logger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appOptions = {
    cors: true,
    rawBody: true, 
    bufferLogs: true,
    logger: appLogger
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(errors)
        throw new BadRequestException(errors);
      }, 
      transform: true
    })
  );
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  await app.listen(3000);
}
bootstrap();
