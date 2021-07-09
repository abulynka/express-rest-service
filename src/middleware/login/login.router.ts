import express from 'express';
import httpCodes from 'http-status-codes';
import { Exception } from '../../common/exception';
import { LoginService } from './login.service';
import { JWT } from '../../common/jwt';

export class LoginRouter {
    private router: express.IRouter;

    private loginService: LoginService;

    constructor() {
        this.router = express.Router({mergeParams: true});
        this.router.route('/').post(this.loginProcess.bind(this));
        this.loginService = new LoginService();
    }

    public getRouter(): express.IRouter {
        return this.router;
    }

    public async loginProcess(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {login, password} = req.body;
            if (!await this.loginService.checkForValidLogin(login, password)) {
                next(new Exception(httpCodes.FORBIDDEN, 'access denied'));
            }

            res.status(httpCodes.OK)
                .send({
                    token: JWT.generateJWT(
                        await this.loginService.getExternalId(login),
                        login
                    )});
        } catch (e) {
            next(new Exception(httpCodes.FORBIDDEN, 'access denied'));
        }
        next();
    }
};