import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext) {
        if (process.env['AUTH_MODE'] === 'true') {
            return super.canActivate(context);
        } else {
            return true;
        }
    }
}
