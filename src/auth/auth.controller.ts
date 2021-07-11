import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  UseGuards
} from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const login = this.authService.login(authDto);
    if (!login) {
      throw new ForbiddenException();
    }
    return login;
  }
}
