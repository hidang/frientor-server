"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const question_service_1 = require("./question.service");
const comment_dto_1 = require("./dto/comment.dto");
const question_dto_1 = require("./dto/question.dto");
const repComment_dto_1 = require("./dto/repComment.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async GetQuestionList() {
        try {
            return this.questionService.GetAllQuestion();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async GetQuestioById(params) {
        try {
            return this.questionService.GetQuestionById(params === null || params === void 0 ? void 0 : params.id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async AddQuestion(request, Body) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.AddQuestion(user, Body);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async EditQuestion(request, Body) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.EditQuestion(user, Body);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async DeleteQuestion(request, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.DeleteQuestion(user, params.id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async GetCommentList(params) {
        try {
            return this.questionService.GetAllCommentInQuestion(params.idQuestion);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async AddComment(request, Body, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User not login' };
        try {
            return this.questionService.AddComment(user, Body, params.idQuestion);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async EditComment(request, Body) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.EditComment(user, Body);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async DeleteComment(request, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.DeleteComment(user, params.id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async GetAllRepCommentByIdComment(params) {
        try {
            return this.questionService.GetAllRepCommentByIdComment(params.idComment);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async AddRepComment(request, Body, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.AddRepComment(user, Body, params.idComment);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async EditRepComment(request, Body) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        if (!Body._id)
            return { message: '_id wrong' };
        try {
            return this.questionService.EditRepComment(user, Body);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async DeleteRepComment(request, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.questionService.DeleteRepComment(user, params.id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    common_1.Get('/'),
    common_1.UseInterceptors(common_1.CacheInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "GetQuestionList", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiParam({ name: 'id', type: String }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "GetQuestioById", null);
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "AddQuestion", null);
__decorate([
    common_1.Put('/'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "EditQuestion", null);
__decorate([
    common_1.Delete('/:id'),
    swagger_1.ApiParam({ name: 'id', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "DeleteQuestion", null);
__decorate([
    common_1.Get('comment/:idQuestion'),
    common_1.UseInterceptors(common_1.CacheInterceptor),
    swagger_1.ApiParam({ name: 'idQuestion', type: String }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "GetCommentList", null);
__decorate([
    common_1.Post('comment/:idQuestion'),
    swagger_1.ApiParam({ name: 'idQuestion', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CommentDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "AddComment", null);
__decorate([
    common_1.Put('comment'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "EditComment", null);
__decorate([
    common_1.Delete('comment/:id'),
    swagger_1.ApiParam({ name: 'id', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "DeleteComment", null);
__decorate([
    common_1.UseInterceptors(common_1.CacheInterceptor),
    common_1.Get('repcomment/:idComment'),
    swagger_1.ApiParam({ name: 'idComment', type: String }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "GetAllRepCommentByIdComment", null);
__decorate([
    common_1.Post('repcomment/:idComment'),
    swagger_1.ApiParam({ name: 'idComment', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, repComment_dto_1.RepCommentDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "AddRepComment", null);
__decorate([
    common_1.Put('repcomment'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, repComment_dto_1.RepCommentDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "EditRepComment", null);
__decorate([
    common_1.Delete('repcomment/:id'),
    swagger_1.ApiParam({ name: 'id', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "DeleteRepComment", null);
QuestionController = __decorate([
    swagger_1.ApiTags('/question'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map