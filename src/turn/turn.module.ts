import { Module } from '@nestjs/common';
import { TurnResolver } from './turn.resolver';
import { TurnService } from './turn.service';
import { TurnRepository } from './turn.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TurnRepository, TurnResolver, TurnService],
  exports: [TurnService],
  imports: [PrismaModule],
})
export class TurnModule {}
