import { IsEmail, IsString } from 'class-validator';

export class GreetQueryDto {
  @IsString()
  name: string;
  @IsEmail()
  @IsString()
  email: string;
}
