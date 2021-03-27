"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const preauth_middlewate_1 = require("./auth/preauth.middlewate");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./user/user.module");
const question_module_1 = require("./question/question.module");
const chat_module_1 = require("./chat/chat.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(preauth_middlewate_1.PreauthMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            question_module_1.QuestionModule,
            chat_module_1.ChatModule,
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/frientor-data', {
                useFindAndModify: false,
            }),
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map