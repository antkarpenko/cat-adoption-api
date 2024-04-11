import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from '@common/variables/environment';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';

const validationPipeService = require('@pipets/validation-pipes');

async function bootstrap() {
  try {
    validationPipeService();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
      .setTitle('Cat adoption API')
      .setDescription('The cat adoption API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(Environment.PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch(err) {

  }
}

bootstrap();
