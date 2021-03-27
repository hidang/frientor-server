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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schema/comment.schema");
const question_schema_1 = require("./schema/question.schema");
const repComment_schema_1 = require("./schema/repComment.schema");
let QuestionService = class QuestionService {
    constructor(questionModel, commentModel, repCommentModel) {
        this.questionModel = questionModel;
        this.commentModel = commentModel;
        this.repCommentModel = repCommentModel;
    }
    async GetAllQuestion() {
        return this.questionModel['getAllQuestion']();
    }
    async GetQuestionById(id) {
        return this.questionModel['getQuestionById'](id);
    }
    async AddQuestion(user, Body) {
        try {
            const uid = user.uid;
            const postNe = {
                uid: uid,
                content: Body.content,
                date: Body.date,
            };
            await new this.questionModel(postNe).save();
            return { message: 'Saved post' };
        }
        catch (err) {
            return { message: err };
        }
    }
    async EditQuestion(user, Body) {
        return this.questionModel['EditQuestion'](user, Body);
    }
    async DeleteQuestion(user, questionId) {
        try {
            const _question = await this.questionModel.findById(questionId);
            if (!_question)
                return { message: 'Question does not exist' };
            if (_question.uid != user.uid)
                return { message: 'user does not own this question' };
            await this.questionModel.findByIdAndDelete(questionId);
            return { message: 'Deleted question' };
        }
        catch (err) {
            return { message: err.message };
        }
    }
    async GetAllCommentInQuestion(questionId) {
        return this.commentModel['GetAllCommentInQuestion'](questionId);
    }
    async AddComment(user, Body, idQuestion) {
        try {
            const _question = await this.questionModel.findById(idQuestion);
            if (!_question)
                return { message: 'Question does not exist' };
            const _comment = {
                uid: user.uid,
                content: Body.content,
                questionId: idQuestion,
                date: Body.date,
                repcomment: [],
            };
            await new this.commentModel(_comment).save();
            return { message: 'Saved comment' };
        }
        catch (err) {
            return { message: err };
        }
    }
    async EditComment(user, Body) {
        return this.commentModel['EditComment'](user, Body);
    }
    async DeleteComment(user, commentId) {
        try {
            const _comment = await this.commentModel.findById(commentId);
            if (!_comment)
                return { message: 'Comment does not exist' };
            if (_comment.uid != user.uid)
                return { message: 'User does not own this comment' };
            await this.commentModel.findByIdAndDelete(commentId);
            return { message: 'Deleted comment' };
        }
        catch (err) {
            return { message: err.message };
        }
    }
    async GetAllRepCommentByIdComment(idComment) {
        return this.repCommentModel['getAllRepCommentnByIdComment'](idComment);
    }
    async AddRepComment(user, Body, idComment) {
        try {
            const _commentRoot = await this.commentModel.findById(idComment);
            if (!_commentRoot)
                return { message: 'CommentRoot does not exist' };
            const repComment = {
                uid: user.uid,
                commentId: idComment,
                content: Body.content,
                date: Body.date,
            };
            const _repComment = await new this.repCommentModel(repComment).save();
            await this.commentModel.findByIdAndUpdate(idComment, { $push: { repcomment: _repComment._id } });
            return { message: 'saved' };
        }
        catch (err) {
            return { message: err };
        }
    }
    async EditRepComment(user, Body) {
        return this.repCommentModel['EditRepComment'](user, Body);
    }
    async DeleteRepComment(user, repCommentId) {
        try {
            const _repComment = await this.repCommentModel.findById(repCommentId);
            if (!_repComment)
                return { message: 'RepComment does not exist' };
            if (_repComment.uid != user.uid)
                return { message: 'User does not own this repcomment' };
            await this.repCommentModel.findByIdAndDelete(repCommentId);
            await this.commentModel.findByIdAndUpdate(_repComment.commentId, { $pull: { repcomment: _repComment._id } });
            return { message: 'Deleted repcomment' };
        }
        catch (err) {
            return { message: err.message };
        }
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(question_schema_1.Question.name)),
    __param(1, mongoose_1.InjectModel(comment_schema_1.Comment.name)),
    __param(2, mongoose_1.InjectModel(repComment_schema_1.RepComment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map