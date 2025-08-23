import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from 'types/table/table.model';
import { Prisma } from '@prisma/client';
import { TableUpdateInput } from 'types/table/table-update.input';
import { TableUncheckedCreateInput } from 'types/table/table-unchecked-create.input';
interface GqlContext {
  req: Request;
}

@Resolver()
export class TableResolver {
  constructor(private readonly tableService: TableService) {}

  @Query(() => [Table], { name: 'GetTables' })
  async getTables(): Promise<Table[]> {
    return this.tableService.getTables();
  }

  @Query(() => Table, { name: 'GetTable' })
  async getTable(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Table | null> {
    return this.tableService.getTable(id);
  }

  @Mutation(() => Table, { name: 'DeleteTable' })
  async deleteTable(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Table | null> {
    return this.tableService.deleteTable(id);
  }

  @Mutation(() => Table, { name: `UpdateTable` })
  async updateTable(
    @Args({ name: `id`, type: () => String }) id: string,
    @Args({ name: `data`, type: () => TableUpdateInput })
    data: Prisma.TableUpdateInput,
  ): Promise<Table | null> {
    return await this.tableService.updateTable(id, data);
  }

  @Mutation(() => Table, { name: 'CreateTable' })
  async createTable(
    @Args('data', { type: () => TableUncheckedCreateInput })
    @Context()
    context: GqlContext,
    data: Prisma.TableUncheckedCreateInput,
  ): Promise<Table> {
    return await this.tableService.createTable(data);
  }
}
