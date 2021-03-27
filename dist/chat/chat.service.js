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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("./schema/chat.schema");
let ChatService = class ChatService {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }
    async GetChatInfoOfUserInComment(uid, commentid) {
        return this.chatModel['GetChatInfoOfUserInComment'](uid, commentid);
    }
    async GetChatContentOfUserInComment(uid, idChat) {
        return this.chatModel['GetChatContentOfUserInComment'](uid, idChat);
    }
    async CreateChatOfUserInComment(uid, idComment, Body) {
        const chat1 = await this.chatModel.findOne({
            uid1: uid,
            uid2: Body.uid2,
            commentId: idComment,
        });
        const chat2 = await this.chatModel.findOne({
            uid1: Body.uid2,
            uid2: uid,
            commentId: idComment,
        });
        if (chat1 || chat2)
            return { message: 'Chat is exist' };
        try {
            const chat = {
                uid1: uid,
                uid2: Body.uid2,
                commentId: idComment,
                title: '',
                content: Body.content,
                public: false,
            };
            await new this.chatModel(chat).save();
            return { message: 'Saved chithub' };
        }
        catch (err) {
            return { message: err };
        }
    }
    async AddChatContent(user, idChat, Body) {
        try {
            const uid = user.uid;
            const contentChat = {
                uid: uid,
                content: Body.content,
                date: Body.date,
            };
            await this.chatModel.findByIdAndUpdate(idChat, { $push: { content: contentChat } });
            return { message: 'Saved content' };
        }
        catch (err) {
            return { message: err };
        }
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map