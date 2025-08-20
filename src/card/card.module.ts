import { Module } from '@nestjs/common';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';
import { CardRepository } from './card.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CardRepository, CardResolver, CardService],
  exports: [CardService],
  imports: [PrismaModule],
})
export class CardModule {}
