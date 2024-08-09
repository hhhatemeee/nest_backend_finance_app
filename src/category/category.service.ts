import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Role } from '@prisma/client'
import { UserRequest } from 'src/decorators/dto/user.dto'
import { PrismaService } from 'src/prisma.service'
import { PayloadUpdateCategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number, user: UserRequest) {
    const category = await this.prisma.category.findFirst({
      where: { AND: [{ id }, { userId: user.id }] },
      omit: { userId: true },
    })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  private async checkIsDefault(id: number, user: UserRequest) {
    const category = await this.getById(id, user)

    if (category.isDefault && user.role !== Role.SUPER_ADMIN) {
      throw new NotFoundException(
        'Default category cannot be modified or deleted',
      )
    }

    return category
  }

  async create(data: Prisma.CategoryCreateInput, user: UserRequest) {
    const categoryData =
      user.role === Role.SUPER_ADMIN
        ? { ...data, user: { connect: { id: user.id } } }
        : { ...data, user: { connect: { id: user.id } }, isDefault: false }

    return this.prisma.category.create({
      data: categoryData,
      omit: { userId: true },
    })
  }

  async findAll(user: UserRequest) {
    return this.prisma.category.findMany({
      where: { OR: [{ isDefault: true }, { user: { id: user.id } }] },
      omit: { userId: true },
    })
  }

  async update(data: PayloadUpdateCategoryDto, user: UserRequest) {
    const findCat = await this.checkIsDefault(data.id, user)

    return this.prisma.category.update({
      data,
      where: { id: findCat.id },
      omit: { userId: true },
    })
  }

  async remove(id: number, user: UserRequest) {
    const findCat = await this.checkIsDefault(id, user)

    this.prisma.category.delete({ where: { id: findCat.id } })
  }
}
