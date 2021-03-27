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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Comment = class Comment {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "uid", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "questionId", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], Comment.prototype, "date", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Comment.prototype, "repcomment", void 0);
Comment = __decorate([
    mongoose_1.Schema()
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
exports.CommentSchema.static('EditComment', async function (user, question) {
    try {
        const commentTemp = (await this.findById(question._id));
        if (user.uid != commentTemp.uid)
            return { message: 'User does not own this question' };
        commentTemp.content = question.content;
        await commentTemp.save();
        return { message: 'Edited question' };
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.CommentSchema.static('GetAllCommentInQuestion', async function (questionId) {
    return this.find({ questionId: questionId }, (err, comments) => {
        return comments;
    });
});
//# sourceMappingURL=comment.schema.js.map