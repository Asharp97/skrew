import { Injectable } from '@nestjs/common';
import { Table, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableRepository {
  constructor(private prisma: PrismaService) {}

  async getTables(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async getTable(id: string): Promise<Table | null> {
    return this.prisma.table.findUnique({ where: { id } });
  }

  async deleteTable(id: string): Promise<Table | null> {
    return this.prisma.table.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateTable(params: {
    where: Prisma.TableWhereUniqueInput;
    data: Prisma.TableUpdateInput;
  }): Promise<Table | null> {
    return this.prisma.table.update(params);
  }

  async createTable(data: Prisma.TableUncheckedCreateInput): Promise<Table> {
    return this.prisma.table.create({ data });
  }

  getTableByAccessCode(accessCode: string): Promise<Table | null> {
    return this.prisma.table.findUnique({ where: { accessCode } });
  }
}
