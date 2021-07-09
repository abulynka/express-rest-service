import {
  Controller,
  Post,
  Body,
  // ClassSerializerInterceptor,
  // UseInterceptors,
  // HttpCode,
  ForbiddenException,
  UseGuards
} from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @HttpCode(200)
  async login(@Body() authDto: AuthDto) {
    const login = this.authService.login(authDto);
    if (!login) {
      throw new ForbiddenException();
    }
    return login;
  }
}
