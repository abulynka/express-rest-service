import { Logger } from './logger'

export class ErrorHandler {
    private static _getErrorExitCode() {
        return 1;
    }

    public static init() {
        process.on('uncaughtException', async (err: string, origin: string) => {
            await Logger.singleton().log(
                `[${  new Date().toISOString()  }] ${  err.toString()  } ${  origin.toString()}`, Logger.LOG_ERROR, true);

            process.exit(ErrorHandler._getErrorExitCode());
        });
        
        process.on('unhandledRejection', async (reason, promise) => {
            await Logger.singleton().log(
                `[${  new Date().toISOString()  }] ${  reason?.toString()  } ${  promise.toString()}`, Logger.LOG_ERROR, true);

            process.exit(ErrorHandler._getErrorExitCode());
        });
    }
}