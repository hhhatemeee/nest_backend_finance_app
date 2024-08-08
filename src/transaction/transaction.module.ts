import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, JwtStrategy],
})
export class TransactionModule {}
