import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } })

    if (!category) throw new NotFoundException('Task not found')

    return category
  }

  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data })
  }

  findAll() {
    return this.prisma.category.findMany()
  }

  async findOne(id: number) {
    return await this.getById(id)
  }

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    const findCat = await this.getById(id)

    return this.prisma.category.update({
      data,
      where: { id: findCat.id },
    })
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } })
  }
}
