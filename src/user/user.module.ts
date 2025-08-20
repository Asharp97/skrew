import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserRepository, UserResolver, UserService],
  exports: [UserService],
  imports: [PrismaModule, ConfigModule, JwtModule],
})
export class UserModule {}
