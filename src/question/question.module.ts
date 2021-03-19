import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Comment, CommentSchema } from './schema/comment.schema';
//import { Repcomment, RepcommentSchema } from './schema/repcomment.schema';
import { Question, QuestionSchema } from './schema/question.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Question.name, schema: QuestionSchema },
      // { name: Repcomment.name, schema: RepcommentSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
