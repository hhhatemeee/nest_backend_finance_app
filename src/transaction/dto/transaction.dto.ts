import { PartialType } from '@nestjs/mapped-types'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class PayloadCreateTransactionDto {
  @IsNumber()
  categoryId: number
  @IsNumber()
  amount: number

  @IsDate()
  @IsOptional()
  transactionDate?: Date | string | null

  @IsString()
  @IsOptional()
  description?: string | null
}

export class PayloadUpdateTransactionDto extends PartialType(
  PayloadCreateTransactionDto,
) {
  @IsNumber()
  id: number
}
