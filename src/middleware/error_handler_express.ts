import { Request, Response, NextFunction } from 'express';
import { Exception } from './exception';
import { Logger } from './logger';

export class ErrorHandlerExpress {
    /**
     * Starts logging mechanism
     * @param req {Request} express request
     * @param res {Response} express response
     * @param next {NextFunction} next function to call
     */
    public static async process(err: Exception, req: Request, res: Response, next: NextFunction) {
        const {status} = err;
        const message = err.message || 'unknown error';

        res.status(status).send();

        const logMessage = `[${  new Date().toISOString()
             }] "${  req.url
             }" [${  status.toString()
             }] ${  JSON.stringify(req.params)
             } ${  JSON.stringify(req.body)
             } ${  message}`;

        await Logger.singleton().log(logMessage, Logger.LOG_EXPRESS_ERROR);

        next();
    }
}   