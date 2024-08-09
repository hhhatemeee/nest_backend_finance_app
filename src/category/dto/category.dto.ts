import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class PayloadCreateCategoryDto {
  @IsString()
  name: string

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean
}

export class PayloadUpdateCategoryDto extends PartialType(
  PayloadCreateCategoryDto,
) {
  @IsNumber()
  id: number
}
