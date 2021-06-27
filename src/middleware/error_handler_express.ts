import { Request, Response, NextFunction } from 'express';
import { Exception } from '../common/exception';
import { Logger } from '../common/logger';

export class ErrorHandlerExpress {
    /**
     * Starts logging mechanism
     * @param req {Request} express request
     * @param res {Response} express response
     * @param next {NextFunction} next function to call
     */
    public static async process(err: Exception, req: Request, res: Response, next: NextFunction) {
        const {status} = err;
        const message = JSON.stringify(err);

        const logMessage = `[${  new Date().toISOString()
             }] "${  req.url
             }" [${  JSON.stringify(status)
             }] ${  JSON.stringify(req.params)
             } ${  JSON.stringify(req.body)
             } ${  message}`;

        await Logger.singleton().log(logMessage, Logger.LOG_EXPRESS_ERROR);

        res.status(status ?? 500).send();

        next();
    }
}   