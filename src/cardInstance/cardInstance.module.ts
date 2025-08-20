import { Module } from '@nestjs/common';
import { CardInstanceResolver } from './cardInstance.resolver';
import { CardInstanceService } from './cardInstance.service';
import { CardInstanceRepository } from './cardInstance.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [
    CardInstanceRepository,
    CardInstanceResolver,
    CardInstanceService,
  ],
  exports: [CardInstanceService],
  imports: [PrismaModule],
})
export class CardInstanceModule {}
