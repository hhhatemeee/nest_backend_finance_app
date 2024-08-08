import { User } from '@prisma/client'

export type UserRequest = Omit<User, 'password'>
