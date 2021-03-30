import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { fireabseConf } from 'src/config-fireabse';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(fireabseConf as any),
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          //console.log(decodedToken);
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
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
