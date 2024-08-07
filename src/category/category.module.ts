import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtStrategy],
})
export class CategoryModule {}
