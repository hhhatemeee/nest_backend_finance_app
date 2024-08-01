import { IsEmail, IsString } from 'class-validator'

export class AuthPayloadDto {
  @IsString()
  username: string

  @IsEmail()
  @IsString()
  email: string

  @IsString()
  password: string
}
