import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CategoryDto {
  @IsString()
  name: string

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean
}
