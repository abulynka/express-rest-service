import * as fs from "fs";
import { EOL } from 'os';

export class Logger {
    static readonly LOG_EXPRESS_SUCCESS: number = 1;
    static readonly LOG_EXPRESS_ERROR: number = 2;
    static readonly LOG_ERROR: number = 3;

    public static singleton(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    private static _instance: Logger;

    private _getFileName(log_level: number = Logger.LOG_EXPRESS_SUCCESS) {
        let result = 'logs/express-rest-service';
        switch (log_level) {
            case Logger.LOG_EXPRESS_SUCCESS:
                return result + '-success.log';
            case Logger.LOG_EXPRESS_ERROR:
                return result + '-error.log';
            case Logger.LOG_ERROR:
                return result + '-exception-error.log';
        }
        throw new Error('unknown log level + ' + log_level.toString());
    }

    public async log(message: string, log_level: number = Logger.LOG_EXPRESS_SUCCESS, waitForWrite = false) {
        const oStream = fs.createWriteStream(this._getFileName(log_level), {
          highWaterMark: 4096,
          flags: "a",
        });

        oStream.write(message + EOL);
        if (waitForWrite) {
            await new Promise(fulfill => oStream.on("finish", fulfill));
        }
        oStream.close();
    }
}