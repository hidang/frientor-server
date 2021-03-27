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
exports.ChatSchema = exports.Chat = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Chat = class Chat {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Chat.prototype, "uid1", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Chat.prototype, "uid2", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], Chat.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Chat.prototype, "commentId", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Chat.prototype, "content", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Boolean)
], Chat.prototype, "public", void 0);
Chat = __decorate([
    mongoose_1.Schema()
], Chat);
exports.Chat = Chat;
exports.ChatSchema = mongoose_1.SchemaFactory.createForClass(Chat);
exports.ChatSchema.static('GetChatInfoOfUserInComment', async function (uid, commentid) {
    return await this.find({
        $or: [
            {
                $and: [{ uid1: uid }, { commentId: commentid }],
            },
            {
                $and: [{ uid2: uid }, { commentId: commentid }],
            },
        ],
    });
});
exports.ChatSchema.static('GetChatContentOfUserInComment', async function (uid, idChat) {
    return await this.findOne({
        $or: [
            {
                $and: [{ uid1: uid }, { _id: idChat }],
            },
            {
                $and: [{ uid2: uid }, { _id: idChat }],
            },
        ],
    });
});
//# sourceMappingURL=chat.schema.js.map