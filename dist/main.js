"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./shared/http-exception.filter");
async function bootstrap() {
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({});
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Frientor API')
        .setVersion('1.0')
        .setBasePath('api')
        .addBearerAuth()
        .build();
    const documents = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, documents);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map