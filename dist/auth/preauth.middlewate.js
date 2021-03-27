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
exports.PreauthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
const firebase_params = {
    type: process.env.TYPE,
    projectId: process.env.PROJECT_ID,
    privateKeyId: process.env.PRIVATE_KEY_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID,
    authUri: process.env.AUTH_URI,
    tokenUri: process.env.TOKEN_URI,
    authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
};
let PreauthMiddleware = class PreauthMiddleware {
    constructor() {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
        });
    }
    use(req, res, next) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultApp
                .auth()
                .verifyIdToken(token.replace('Bearer ', ''))
                .then(async (decodedToken) => {
                const user = {
                    email: decodedToken.email,
                    uid: decodedToken.uid,
                    name: decodedToken.name,
                    photoURL: decodedToken.picture,
                };
                req['user'] = user;
                next();
            })
                .catch((error) => {
                console.error(error);
                this.accessDenied(req.url, res);
            });
        }
        else {
            next();
        }
    }
    accessDenied(url, res) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied',
        });
    }
};
PreauthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PreauthMiddleware);
exports.PreauthMiddleware = PreauthMiddleware;
//# sourceMappingURL=preauth.middlewate.js.map