import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
//import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //----------------------------------------------------------------------------
  //allow all origin, header, ...
  app.enableCors({});
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //----------------------------------------------------------------------------
  //Use Swagger /api
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Frientor API')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const documents = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documents);
  //-----------------------------------------------------------------------------
  await app.listen(port);
}
bootstrap();
