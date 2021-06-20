import express from 'express';
import { Logger } from '../common/logger';

export class HandlerExpress {
    /**
     * Starts logging mechanism
     * @param req {express.Request} express request
     * @param res {express.Response} express response
     * @param next {express.NextFunction} next function to call
     */
    public static async process(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.on('finish', async () => {
            const message = `[${  new Date().toISOString()
             }] "${  req.url
             }" [${  res.statusCode.toString()
             }] ${  JSON.stringify(req.query)
             } - ${  JSON.stringify(req.params || '')
             } - ${  JSON.stringify(req.body)}`;
    
            await Logger.singleton().log(message, Logger.LOG_EXPRESS_SUCCESS);
        });
        next();
    }
}