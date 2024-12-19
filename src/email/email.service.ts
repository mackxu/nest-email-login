import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class EmailService {
  transporter: Transporter;
  constructor(private configService: ConfigService) {
    // 配置发送者邮箱
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('email_user'), // 发送者邮箱
        pass: this.configService.get('email_pass'), // 发送者邮箱的授权码
      },
    });
  }

  @Inject()
  private redisService: RedisService;

  async sendEmail(address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.transporter.sendMail({
      from: {
        name: '测试nest系统', // 发送者名称
        address: this.configService.get('email_user'), // 发送者邮箱
      },
      to: address, // 接收者邮箱
      subject: '登录验证码',
      html: `<b>你的登录验证码是 ${code}</b>`,
    });
  }
}
