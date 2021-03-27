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
exports.QuestionSchema = exports.Question = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Question = class Question {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Question.prototype, "uid", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], Question.prototype, "date", void 0);
Question = __decorate([
    mongoose_1.Schema()
], Question);
exports.Question = Question;
exports.QuestionSchema = mongoose_1.SchemaFactory.createForClass(Question);
exports.QuestionSchema.static('EditQuestion', async function (user, question) {
    try {
        const quetionTemp = (await this.findById(question._id));
        if (user.uid != quetionTemp.uid)
            return { message: 'User does not own this question' };
        quetionTemp.content = question.content;
        await quetionTemp.save();
        return { message: 'edited question' };
    }
    catch (error) {
        return { message: error.message };
    }
});
exports.QuestionSchema.static('getAllQuestion', async function () {
    return this.find({}, (err, questions) => {
        return questions;
    });
});
exports.QuestionSchema.static('getQuestionById', async function (id) {
    return this.findOne({ _id: id }, (err, question) => {
        return question;
    });
});
//# sourceMappingURL=question.schema.js.map