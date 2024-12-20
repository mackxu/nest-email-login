import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUser2Dto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  code: string;
}
