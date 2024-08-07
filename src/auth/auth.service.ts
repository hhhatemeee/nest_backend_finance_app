import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUser(username: string, email?: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })

    if (!user) return null

    return user
  }

  private getAuthTokens(payload: Omit<User, 'password'>) {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '3d',
      }),
    }
  }

  async createUser(data: Prisma.UserCreateInput) {
    const findUser = await this.getUser(data.username, data.email)

    if (findUser) {
      if (findUser.username === data.username)
        throw new HttpException('User already exists', 409)
      if (findUser.email === data.email)
        throw new HttpException('Email already exists', 409)
    }

    const hashPassword = await hash(data.password, +process.env.salt_rounds)

    const user: Prisma.UserCreateInput = {
      ...data,
      password: hashPassword,
    }

    const { password, ...createdUser } = await this.prisma.user.create({
      data: user,
    })

    return this.getAuthTokens(createdUser)
  }

  async validateUser(user: { username: string; password: string }) {
    const findUser = await this.getUser(user.username, user.username)

    if (!findUser) throw new NotFoundException('User not found')

    const isCorrectPassword = await compare(user.password, findUser.password)

    if (isCorrectPassword) {
      const { password: _, ...user } = findUser
      return this.getAuthTokens(user)
    } else {
      throw new UnauthorizedException('Incorrect password')
    }
  }

  async refreshToken(refreshToken: string) {
    const decodedData = this.jwtService.verify(refreshToken)

    const findUser = await this.getUser(decodedData.username)

    if (findUser) {
      const { password, ...user } = findUser
      return this.getAuthTokens(user)
    }
  }
}
