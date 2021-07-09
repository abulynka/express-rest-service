import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const params = context.switchToHttp().getRequest().body as AuthDto;
    if (params.login && params.password) {
        return true;
    }
    return super.canActivate(context);
  }
}
