import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { User2Service } from './user2.service';
import { LoginUser2Dto } from './dto/login-user2.dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('user2')
export class User2Controller {
  constructor(private readonly user2Service: User2Service) {}

  @Inject()
  private redisService: RedisService;

  @Post('login')
  async login(@Body() user: LoginUser2Dto) {
    const codeInRedis = await this.redisService.get(`captcha_${user.email}`);
    if (!codeInRedis) {
      throw new UnauthorizedException('验证码已过期');
    }
    if (codeInRedis !== user.code) {
      throw new UnauthorizedException('验证码错误');
    }
    // 验证码验证通过
    return this.user2Service.findUser2ByEmail(user.email);
  }
}
