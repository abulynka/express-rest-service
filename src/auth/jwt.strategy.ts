import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthSecret } from './auth-secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthSecret.getSecret(),
    });
  }

  async validate(payload: { [ key: string]: string }) {
    return { userId: payload['sub'], username: payload['username'] };
  }
}
