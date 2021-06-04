import httpCodes from 'http-status-codes';

export class Exception extends Error {
    static readonly STATUS_NOT_FOUND: number = httpCodes.NOT_FOUND;
    static readonly STATUS_INTERNAL_ERROR: number = httpCodes.INTERNAL_SERVER_ERROR;
    static readonly STATUS_BAD_REQUEST: number = httpCodes.BAD_REQUEST;

    private _status: number;
    private _message: string;

    constructor(status: number = 500, message: string = 'internal server error') {
        super(message);
        this._status = status;
        this._message = message;
    }

    public get status() {
        return this._status;
    }

    public get message() {
        return this._message;
    }
}