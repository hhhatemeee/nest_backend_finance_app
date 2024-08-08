import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    })

    if (!transaction) throw new NotFoundException('Task not found')

    return transaction
  }

  async getAllById(id: number) {
    return this.prisma.transaction.findMany({
      where: {
        userId: id,
      },
    })
  }

  async createTransaction(data: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({ data })
  }

  async updateTransaction(
    data: Prisma.TransactionUpdateInput & { id: number, userId: number },
  ) {
    const { id, userId, ...updatedData } = data
    const findTransaction = await this.getById(id)

    if (findTransaction.userId !== userId) {
      throw new NotFoundException('Transaction not found')
    }

    return this.prisma.transaction.update({
      data: updatedData,
      where: { id: findTransaction.id },
    })
  }

  async deleteTransaction({ id, userId }: { id: number; userId: number }) {
    const findTransaction = await this.getById(id)

    if (findTransaction.userId !== userId) {
      throw new NotFoundException('Transaction not found')
    }

    return this.prisma.transaction.delete({ where: { id } })
  }
}
