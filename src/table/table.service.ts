import { Injectable } from '@nestjs/common';
import { Table, Prisma } from '@prisma/client';
import { TableRepository } from './table.repository';
import { UserService } from 'src/user/user.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TableStatus } from 'types/prisma/table-status.enum';

@Injectable()
export class TableService {
  constructor(
    private repo: TableRepository,
    private readonly userService: UserService,
  ) {}
  async getTables(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TableWhereUniqueInput;
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput;
  }): Promise<Table[]> {
    return await this.repo.getTables(params);
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

  async createTable(token: string): Promise<Table> {
    const data: Prisma.TableUncheckedCreateInput = {};
    const userId = this.userService.getUserIdFromToken(token);
    if (!userId) throw new Error('Invalid token');
    data.accessCode = Math.random().toString(36).substring(2, 8).toLowerCase();
    data.adminId = userId;
    const table = await this.repo.createTable(data);
    const updatedTable = await this.repo.updateTable({
      where: { id: table.id },
      data: {
        user: {
          connect: { id: userId },
        },
        userCount: { increment: 1 },
      },
    });
    if (!updatedTable) {
      throw new Error('Failed to update table');
    }
    return updatedTable;
  }

  async joinTable(accessCode: string, token: string): Promise<Table | null> {
    const userId = this.userService.getUserIdFromToken(token);
    if (!userId) {
      throw new Error('Invalid token');
    }
    const table = await this.repo.getTableByAccessCode(
      accessCode.toLowerCase(),
    );
    if (!table) {
      throw new Error('Table not found');
    }
    const isUserInTable = await this.userService.isUserInTable(
      table.id,
      userId,
    );
    if (isUserInTable) {
      throw new Error('User is already in the table');
    }
    await this.repo.updateTable({
      where: { id: table.id },
      data: {
        user: {
          connect: { id: userId },
        },
        userCount: { increment: 1 },
      },
    });
    return await this.repo.getTableByAccessCode(accessCode);
  }

  async leaveTable(token: string): Promise<Table | null> {
    const userId = this.userService.getUserIdFromToken(token);
    if (!userId) throw new Error('Invalid token');
    const user = await this.userService.getUser(userId);

    const tableId = user?.tableId;
    if (!tableId) throw new Error('User is not in a table');

    return await this.repo.updateTable({
      where: { id: tableId },
      data: {
        user: {
          disconnect: { id: userId },
        },
        userCount: { decrement: 1 },
      },
    });
  }

  async startGame(token: string): Promise<Table | null> {
    const userId = this.userService.getUserIdFromToken(token);
    if (!userId) throw new Error('Invalid token');

    const user = await this.userService.getUser(userId);

    const tableId = user?.tableId;
    if (!tableId) throw new Error('User is not in a table');

    if (!(await this.repo.isUserAdmin(userId, tableId)))
      throw new Error('Unauthorized to start game');

    return await this.repo.updateTable({
      where: { id: tableId },
      data: {
        status: TableStatus.Playing,
      },
    });
  }

  tableExpirationTime = Number(process.env.table_expires_in) || 10 * 60 * 1000; // 10 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  async purgeUnusedTables() {
    const expirationTime = new Date(Date.now() - this.tableExpirationTime);
    const waitingTables = await this.repo.getTables({
      where: {
        status: TableStatus.Waiting,
        createdAt: { lt: expirationTime },
      },
    });
    const processes = waitingTables.map((table) => {
      return this.repo.hardDeleteTable(table.id);
    });
    await Promise.all(processes);
  }
}
