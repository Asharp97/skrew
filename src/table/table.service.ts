import { Injectable } from '@nestjs/common';
import { Table, Prisma } from '@prisma/client';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  constructor(private repo: TableRepository) {}
  async getTables(): Promise<Table[]> {
    return await this.repo.getTables();
  }

  async getTable(id: string): Promise<Table | null> {
    return await this.repo.getTable(id);
  }

  async deleteTable(id: string): Promise<Table | null> {
    return await this.repo.deleteTable(id);
  }

  async updateTable(
    id: string,
    data: Prisma.TableUpdateInput,
  ): Promise<Table | null> {
    return await this.repo.updateTable({ where: { id }, data });
  }

  async createTable(data: Prisma.TableUncheckedCreateInput): Promise<Table> {
    return await this.repo.createTable(data);
  }
}
