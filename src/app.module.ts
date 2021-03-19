import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PreauthMiddleware } from './auth/preauth.middlewate';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
@Module({
  imports: [
    UserModule,
    QuestionModule,
    MongooseModule.forRoot('mongodb://localhost:27017/frientor-data'),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
