import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class PreauthMiddleware implements NestMiddleware {
    private defaultApp;
    constructor();
    use(req: Request, res: Response, next: NextFunction): void;
    private accessDenied;
}
