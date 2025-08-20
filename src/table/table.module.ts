import { Module } from '@nestjs/common';
import { TableResolver } from './table.resolver';
import { TableService } from './table.service';
import { TableRepository } from './table.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TableRepository, TableResolver, TableService],
  exports: [TableService],
  imports: [PrismaModule],
})
export class TableModule {}
