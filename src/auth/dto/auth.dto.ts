import { IsEmail, IsOptional, IsString } from 'class-validator'

export class AuthPayloadDto {
  @IsString()
  username: string

  @IsEmail()
  @IsOptional()
  @IsString()
  email: string

  @IsString()
  password: string
}
