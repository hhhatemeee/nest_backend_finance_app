import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { User } from 'src/decorators/user.decorator'
import { UserRequest } from 'src/decorators/dto/user.dto'
import {
  PayloadCreateTransactionDto,
  PayloadUpdateTransactionDto,
} from './dto/transaction.dto'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@User() user: UserRequest) {
    return this.transactionService.getAllById(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(
    @Body(new ValidationPipe()) data: PayloadCreateTransactionDto,
    @User() user: UserRequest,
  ) {
    const { categoryId, ...body } = data

    return this.transactionService.createTransaction({
      ...body,
      user: { connect: { id: user.id } },
      category: { connect: { id: data.categoryId } },
    })
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update(
    @Body(new ValidationPipe()) data: PayloadUpdateTransactionDto,
    @User() user: UserRequest,
  ) {
    return this.transactionService.updateTransaction({
      ...data,
      userId: user.id,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @User() user: UserRequest) {
    return this.transactionService.deleteTransaction({
      id,
      userId: user.id,
    })
  }
}
