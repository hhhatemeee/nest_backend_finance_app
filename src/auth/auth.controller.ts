import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalGuard } from './guards/local.guard'
import { Request } from 'express'
import { JwtAuthGuard } from './guards/jwt.guard'
import { AuthPayloadDto } from './dto/auth.dto'
import { RefreshJwtAuthGuard } from './guards/refresh.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(new ValidationPipe()) data: AuthPayloadDto) {
    return this.authService.createUser(data)
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  refreshToken(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshToken(refresh_token)
  }
}
