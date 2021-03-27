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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const chat_dto_1 = require("./dto/chat.dto");
const chatContent_dto_1 = require("./dto/chatContent.dto");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async GetChatInfoOfUserInComment(request, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.chatService.GetChatInfoOfUserInComment(user === null || user === void 0 ? void 0 : user.uid, params.idComment);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async GetChatContentOfUserInComment(request, params) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.chatService.GetChatContentOfUserInComment(user === null || user === void 0 ? void 0 : user.uid, params.idChat);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async CreateChatOfUserInComment(request, params, Body) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.chatService.CreateChatOfUserInComment(user === null || user === void 0 ? void 0 : user.uid, params.idComment, Body);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async AddChatContent(request, params, Body) {
        const user = request['user'];
        if (!user)
            return { message: 'User does not login' };
        try {
            return this.chatService.AddChatContent(user, params.idChat, Body);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    common_1.Get('/:idComment'),
    swagger_1.ApiParam({ name: 'idComment', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "GetChatInfoOfUserInComment", null);
__decorate([
    common_1.Get('content/:idChat'),
    swagger_1.ApiParam({ name: 'idChat', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "GetChatContentOfUserInComment", null);
__decorate([
    common_1.Post('/:idComment'),
    swagger_1.ApiParam({ name: 'idComment', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, chat_dto_1.ChatDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "CreateChatOfUserInComment", null);
__decorate([
    common_1.Post('/content/:idChat'),
    swagger_1.ApiParam({ name: 'idChat', type: String }),
    __param(0, common_1.Request()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, chatContent_dto_1.ChatContentDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "AddChatContent", null);
ChatController = __decorate([
    swagger_1.ApiTags('/chat'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map