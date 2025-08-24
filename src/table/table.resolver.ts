import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from 'types/table/table.model';
import { Prisma } from '@prisma/client';
import { TableUpdateInput } from 'types/table/table-update.input';
import { GqlContext } from 'src/common/types/gql-context.type';
import extractTokenFromHeader from 'src/common/utils/extractTokenFromHeader';

@Resolver()
export class TableResolver {
  constructor(private readonly tableService: TableService) {}

  @Query(() => [Table], { name: 'GetTables' })
  async getTables(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TableWhereUniqueInput;
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput;
  }): Promise<Table[]> {
    return this.tableService.getTables(params);
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
  async createTable(@Context() context: GqlContext): Promise<Table> {
    const token = extractTokenFromHeader(context.req);
    if (!token) throw new Error('Unauthorized');

    return await this.tableService.createTable(token);
  }

  @Mutation(() => Table, { name: 'JoinTable' })
  async joinTable(
    @Args('accessCode', { type: () => String }) accessCode: string,
    @Context() context: GqlContext,
  ): Promise<Table | null> {
    const token = extractTokenFromHeader(context.req);
    if (!token) {
      throw new Error('Unauthorized');
    }
    return await this.tableService.joinTable(accessCode, token);
  }

  @Mutation(() => Table, { name: 'LeaveTable' })
  async leaveTable(@Context() context: GqlContext): Promise<Table | null> {
    const token = extractTokenFromHeader(context.req);
    if (!token) {
      throw new Error('Unauthorized');
    }
    return await this.tableService.leaveTable(token);
  }

  @Mutation(() => Table, { name: 'StartGame' })
  async startGame(@Context() context: GqlContext): Promise<Table | null> {
    const token = extractTokenFromHeader(context.req);
    if (!token) {
      throw new Error('Unauthorized');
    }

    return await this.tableService.startGame(token);
  }
}
