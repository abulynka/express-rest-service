import express from 'express';
import httpCodes from 'http-status-codes';
import { Exception } from '../common/exception';
import { LoginService } from './login/login.service';

export class HandlerJWT {
    private loginService: LoginService;

    public constructor() {
        this.loginService = new LoginService();
    }

    public async process(req: express.Request, _res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const auth = req.headers.authorization?.split(' ');
            if (!auth || auth.length !== 2 || auth[0] !== 'Bearer') {
                next(new Exception(httpCodes.UNAUTHORIZED, `req.headers.authorization doesn't exist or malformed`));
                return;
            }

            if (!await this.loginService.checkForValidToken(`${ auth[1] }`)) {
                next(new Exception(httpCodes.UNAUTHORIZED, `unable to validate user`));
                return;
            }
        } catch {
            next(new Exception(httpCodes.UNAUTHORIZED, `unable to validate user`));
            return;
        }
        next();
    }
}