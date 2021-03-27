import { CacheModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Question, QuestionSchema } from './schema/question.schema';
import { RepComment, RepCommentSchema } from './schema/repcomment.schema';
@Global()
@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: RepComment.name, schema: RepCommentSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
