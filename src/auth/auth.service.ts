import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async createUser(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user })
  }

  async validateUser(user: Prisma.UserCreateInput) {
    const findUser = await this.getUser(user.username)

    if (user.password === findUser.password) {
      const { password: _, ...user } = findUser
      return this.jwtService.sign(user)
    }
  }
}
