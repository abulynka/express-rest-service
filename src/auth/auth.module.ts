import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthSecret } from './auth-secret';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: AuthSecret.getSecret(),
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthSecret],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
