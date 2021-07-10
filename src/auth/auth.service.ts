import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto): Promise<boolean> {
    const user = await this.usersService.findByLogin(authDto.login);
    if (!user) {
      return false;
    }
    return user.checkPassword(authDto.password);
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByLogin(authDto.login);
    const payload = { id: user?.id, login: user?.login };
    return {token: this.jwtService.sign(payload)};
  }
}