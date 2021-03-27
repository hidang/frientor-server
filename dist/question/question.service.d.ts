import { Model } from 'mongoose';
import { CommentDocument } from './schema/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { QuestionDocument } from './schema/question.schema';
import { RepCommentDocument } from './schema/repComment.schema';
import { RepCommentDto } from './dto/repComment.dto';
export declare class QuestionService {
    private questionModel;
    private commentModel;
    private repCommentModel;
    constructor(questionModel: Model<QuestionDocument>, commentModel: Model<CommentDocument>, repCommentModel: Model<RepCommentDocument>);
    GetAllQuestion(): Promise<QuestionDocument[]>;
    GetQuestionById(id: string): Promise<QuestionDocument[]>;
    AddQuestion(user: any, Body: QuestionDto): Promise<{
        message: string;
    }>;
    EditQuestion(user: any, Body: QuestionDto): Promise<{
        message: string;
    }>;
    DeleteQuestion(user: any, questionId: string): Promise<{
        message: string;
    }>;
    GetAllCommentInQuestion(questionId: string): Promise<CommentDocument[]>;
    AddComment(user: any, Body: CommentDto, idQuestion: string): Promise<{
        message: string;
    }>;
    EditComment(user: any, Body: CommentDto): Promise<{
        message: string;
    }>;
    DeleteComment(user: any, commentId: string): Promise<{
        message: string;
    }>;
    GetAllRepCommentByIdComment(idComment: string): Promise<RepCommentDocument[]>;
    AddRepComment(user: any, Body: RepCommentDto, idComment: string): Promise<{
        message: string;
    }>;
    EditRepComment(user: any, Body: RepCommentDto): Promise<{
        message: string;
    }>;
    DeleteRepComment(user: any, repCommentId: string): Promise<{
        message: string;
    }>;
}
