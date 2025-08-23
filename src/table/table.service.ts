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
    data.accessCode = Math.random().toString(36).substring(2, 8);
    return await this.repo.createTable(data);
  }

  async getTableByAccessCode(accessCode: string): Promise<Table | null> {
    return await this.repo.getTableByAccessCode(accessCode);
  }

  async joinTable(accessCode: string): Promise<Table | null> {
    //get user by token
    //add user to table by updating table
    //if admin
    return await this.repo.getTableByAccessCode(accessCode);
  }
}
