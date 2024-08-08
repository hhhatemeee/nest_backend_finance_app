import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  private async checkIsDefault(id: number, role: Role) {
    const category = await this.getById(id)

    if (category.isDefault && role !== Role.SUPER_ADMIN) {
      throw new NotFoundException(
        'Default category cannot be modified or deleted',
      )
    }

    return category
  }

  async create(data: Prisma.CategoryCreateInput, role: Role) {
    const categoryData =
      role === Role.SUPER_ADMIN ? data : { ...data, isDefault: false }

    return this.prisma.category.create({ data: categoryData })
  }

  async findAll() {
    return this.prisma.category.findMany()
  }

  async update(id: number, data: Prisma.CategoryUpdateInput, role: Role) {
    const findCat = await this.checkIsDefault(id, role)

    return this.prisma.category.update({
      data,
      where: { id: findCat.id },
    })
  }

  async remove(id: number, role: Role) {
    const findCat = await this.checkIsDefault(id, role)

    return this.prisma.category.delete({ where: { id: findCat.id } })
  }
}
