import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TurnService } from './turn.service';
import { Turn } from 'types/turn/turn.model';
import { Prisma } from '@prisma/client';
import { TurnUpdateInput } from 'types/turn/turn-update.input';
import { TurnUncheckedCreateInput } from 'types/turn/turn-unchecked-create.input';

@Resolver()
export class TurnResolver {
  constructor(private readonly turnService: TurnService) {}

  @Query(() => [Turn], { name: 'GetTurns' })
  async getTurns(): Promise<Turn[]> {
    return this.turnService.getTurns();
  }

  @Query(() => Turn, { name: 'GetTurn' })
  async getTurn(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Turn | null> {
    return this.turnService.getTurn(id);
  }

  @Mutation(() => Turn, { name: 'DeleteTurn' })
  async deleteTurn(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Turn | null> {
    return this.turnService.deleteTurn(id);
  }

  @Mutation(() => Turn, { name: `UpdateTurn` })
  async updateTurn(
    @Args({ name: `id`, type: () => String }) id: string,
    @Args({ name: `data`, type: () => TurnUpdateInput })
    data: Prisma.TurnUpdateInput,
  ): Promise<Turn | null> {
    return await this.turnService.updateTurn(id, data);
  }

  @Mutation(() => Turn, { name: 'CreateTurn' })
  async createTurn(
    @Args('data', { type: () => TurnUncheckedCreateInput })
    data: Prisma.TurnUncheckedCreateInput,
  ): Promise<Turn> {
    return await this.turnService.createTurn(data);
  }
}
