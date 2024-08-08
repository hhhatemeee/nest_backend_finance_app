import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('gql') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req

    const token = request.headers.authorization?.replace('Bearer ', '')

    if (token) {
      try {
        const jwtService = new JwtService({ secret: process.env.secret })
        const user = await jwtService.verify(token, {
          secret: process.env.secret,
        })
        request.user = user

        return true
      } catch (e) {
        throw new UnauthorizedException()
      }
    }

    return false
  }
}
