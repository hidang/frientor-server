import { QuestionService } from './question.service';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { RepCommentDto } from './dto/repComment.dto';
import { QuestionDocument } from './schema/question.schema';
import { RepCommentDocument } from './schema/repComment.schema';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    GetQuestionList(): Promise<QuestionDocument[]>;
    GetQuestioById(params: any): Promise<QuestionDocument[]>;
    AddQuestion(request: Request, Body: QuestionDto): Promise<{
        message: string;
    }>;
    EditQuestion(request: Request, Body: QuestionDto): Promise<{
        message: string;
    }>;
    DeleteQuestion(request: Request, params: any): Promise<{
        message: string;
    }>;
    GetCommentList(params: any): Promise<QuestionDocument[]>;
    AddComment(request: Request, Body: CommentDto, params: any): Promise<{
        message: string;
    }>;
    EditComment(request: Request, Body: CommentDto): Promise<{
        message: string;
    }>;
    DeleteComment(request: Request, params: any): Promise<{
        message: string;
    }>;
    GetAllRepCommentByIdComment(params: any): Promise<RepCommentDocument[]>;
    AddRepComment(request: Request, Body: RepCommentDto, params: any): Promise<{
        message: string;
    }>;
    EditRepComment(request: Request, Body: RepCommentDto): Promise<{
        message: string;
    }>;
    DeleteRepComment(request: Request, params: any): Promise<{
        message: string;
    }>;
}
