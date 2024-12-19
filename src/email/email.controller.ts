import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('code')
  async sendEmail(@Query('email') email: string) {
    await this.emailService.sendEmail(email);
    return '发送成功';
  }
}
