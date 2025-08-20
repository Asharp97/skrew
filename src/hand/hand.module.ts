import { Module } from '@nestjs/common';
import { HandResolver } from './hand.resolver';
import { HandService } from './hand.service';
import { HandRepository } from './hand.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [HandRepository, HandResolver, HandService],
  exports: [HandService],
  imports: [PrismaModule],
})
export class HandModule {}
