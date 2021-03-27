"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const question_controller_1 = require("./question.controller");
const question_service_1 = require("./question.service");
const comment_schema_1 = require("./schema/comment.schema");
const question_schema_1 = require("./schema/question.schema");
const repComment_schema_1 = require("./schema/repComment.schema");
let QuestionModule = class QuestionModule {
};
QuestionModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            common_1.CacheModule.register(),
            mongoose_1.MongooseModule.forFeature([
                { name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema },
                { name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema },
                { name: repComment_schema_1.RepComment.name, schema: repComment_schema_1.RepCommentSchema },
            ]),
        ],
        controllers: [question_controller_1.QuestionController],
        providers: [question_service_1.QuestionService],
    })
], QuestionModule);
exports.QuestionModule = QuestionModule;
//# sourceMappingURL=question.module.js.map