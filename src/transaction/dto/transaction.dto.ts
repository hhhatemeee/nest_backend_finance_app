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

export class PayloadUpdateTransactionDto {
  @IsNumber()
  id: number

  @IsNumber()
  @IsOptional()
  categoryId: number

  @IsNumber()
  @IsOptional()
  amount: number

  @IsDate()
  @IsOptional()
  transactionDate?: Date | string | null

  @IsString()
  @IsOptional()
  description?: string | null
}
