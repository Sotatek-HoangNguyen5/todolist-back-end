import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './shares/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Todolist API')
    .setDescription('The todolist API description')
    .setVersion('1.0')
    .addTag('Todolist')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/api', app, document);

  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
