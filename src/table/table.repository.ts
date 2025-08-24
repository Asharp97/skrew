import { Injectable } from '@nestjs/common';
import { Table, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableRepository {
  constructor(private prisma: PrismaService) {}

  async getTables(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TableWhereUniqueInput;
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput;
  }): Promise<Table[]> {
    return this.prisma.table.findMany(params);
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
    return this.prisma.table.findUnique({
      where: { accessCode, deletedAt: null },
    });
  }

  async isUserAdmin(userId: string, tableId: string): Promise<boolean> {
    const count = await this.prisma.table.count({
      where: { id: tableId, adminId: userId, deletedAt: null },
    });
    return count > 0;
  }
  async hardDeleteTable(id: string): Promise<Table | null> {
    return this.prisma.table.delete({
      where: { id },
    });
  }
}
