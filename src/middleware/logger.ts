import * as fs from "fs";
import { EOL } from 'os';

export class Logger {
    static readonly LOG_EXPRESS_SUCCESS: number = 1;

    static readonly LOG_EXPRESS_ERROR: number = 2;

    static readonly LOG_ERROR: number = 3;

    static readonly LOG_TO_STDOUT = 1;

    static readonly LOG_TO_FILE = 2;

    static readonly LOG_TO_STDOUT_FILE = 3;

    public static singleton(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    private static _instance: Logger;

    private _logTo = Logger.LOG_TO_STDOUT_FILE;

    private static _getPrefix(logLevel: number = Logger.LOG_EXPRESS_SUCCESS) {
        switch (logLevel) {
            case Logger.LOG_EXPRESS_SUCCESS:
                return 'success';
            case Logger.LOG_EXPRESS_ERROR:
                return 'error';
            case Logger.LOG_ERROR:
                return 'exception';
            default:
                throw new Error(`unknown log level + ${  logLevel.toString()}`);
        }
    }

    private static _getFileName(logLevel: number = Logger.LOG_EXPRESS_SUCCESS) {
        return `logs/express-rest-service-${  Logger._getPrefix(logLevel)  }.log`;
    }

    public set logTo(logTo: number) {
        this._logTo = logTo;
    }

    public async log(message: string, logLevel: number = Logger.LOG_EXPRESS_SUCCESS, waitForWrite = false) {
        if (this._logTo === Logger.LOG_TO_STDOUT || this._logTo === Logger.LOG_TO_STDOUT_FILE) {
            process.stdout.write(`[${  Logger._getPrefix(logLevel)  }] - ${  message  }${EOL}`);
        }

        if (this._logTo === Logger.LOG_TO_FILE || this._logTo === Logger.LOG_TO_STDOUT_FILE) {
            const oStream = fs.createWriteStream(Logger._getFileName(logLevel), {
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
}