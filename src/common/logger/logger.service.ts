import * as fs from "fs";
import { EOL } from 'os';

export class LoggerService {
    static readonly LOG_HTTP_SUCCESS = 'http-success';

    static readonly LOG_HTTP_ERROR = 'http-error';

    static readonly LOG_APP_LOG = 'app-log';

    static readonly LOG_APP_ERROR = 'app-error';

    static readonly LOG_APP_WARN = 'app-warn';

    static readonly LOG_APP_DEBUG = 'app-debug';

    static readonly LOG_APP_VERBOSE = 'app-verbose';

    static readonly LOG_TO_STDOUT = 1;

    static readonly LOG_TO_FILE = 2;

    static readonly LOG_TO_STDOUT_FILE = 3;

    private logDir = "./logs";

    public constructor() {
        if (process.env['LOG_DIR']) {
            this.logDir = process.env['LOG_DIR'];
        }

        if (!fs.existsSync(this.logDir)){
            fs.mkdirSync(this.logDir);
        }
    }

    private logTo: number = LoggerService.LOG_TO_STDOUT_FILE;

    private getFileName(logLevel: string = LoggerService.LOG_HTTP_SUCCESS) {
        return `${this.logDir}/rest-service-${logLevel}.log`;
    }

    public setLogTo(logTo: number) {
        this.logTo = logTo;
    }

    public async log(message: string, logLevel: string = LoggerService.LOG_HTTP_SUCCESS, waitForWrite = false) {
        if (this.logTo === LoggerService.LOG_TO_STDOUT || this.logTo === LoggerService.LOG_TO_STDOUT_FILE) {
            process.stdout.write(`[${  logLevel  }] - ${  message  }${EOL}`);
        }

        if (this.logTo === LoggerService.LOG_TO_FILE || this.logTo === LoggerService.LOG_TO_STDOUT_FILE) {
            const oStream = fs.createWriteStream(this.getFileName(logLevel), {
                highWaterMark: 4096,
                flags: "a",
                mode: 0o777,
            });

            oStream.write(message + EOL);
            if (waitForWrite) {
                await new Promise(fulfill => oStream.on("finish", fulfill));
            }
            oStream.close();
        }
    }
}