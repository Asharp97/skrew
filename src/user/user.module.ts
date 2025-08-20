import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserRepository, UserResolver, UserService],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
