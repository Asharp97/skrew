import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CardInstanceService } from './cardInstance.service';
import { CardInstance } from 'types/card-instance/card-instance.model';
import { Prisma } from '@prisma/client';
import { CardInstanceUpdateInput } from 'types/card-instance/card-instance-update.input';
import { CardInstanceUncheckedCreateInput } from 'types/card-instance/card-instance-unchecked-create.input';

@Resolver()
export class CardInstanceResolver {
  constructor(private readonly cardInstanceService: CardInstanceService) {}

  @Query(() => [CardInstance], { name: 'GetCardInstances' })
  async getCardInstances(): Promise<CardInstance[]> {
    return this.cardInstanceService.getCardInstances();
  }

  @Query(() => CardInstance, { name: 'GetCardInstance' })
  async getCardInstance(
    @Args('id', { type: () => String }) id: string,
  ): Promise<CardInstance | null> {
    return this.cardInstanceService.getCardInstance(id);
  }

  @Mutation(() => CardInstance, { name: 'DeleteCardInstance' })
  async deleteCardInstance(
    @Args('id', { type: () => String }) id: string,
  ): Promise<CardInstance | null> {
    return this.cardInstanceService.deleteCardInstance(id);
  }

  @Mutation(() => CardInstance, { name: `UpdateCardInstance` })
  async updateCardInstance(
    @Args({ name: `id`, type: () => String }) id: string,
    @Args({ name: `data`, type: () => CardInstanceUpdateInput })
    data: Prisma.CardInstanceUpdateInput,
  ): Promise<CardInstance | null> {
    return await this.cardInstanceService.updateCardInstance(id, data);
  }

  @Mutation(() => CardInstance, { name: 'CreateCardInstance' })
  async createCardInstance(
    @Args('data', { type: () => CardInstanceUncheckedCreateInput })
    data: Prisma.CardInstanceUncheckedCreateInput,
  ): Promise<CardInstance> {
    return await this.cardInstanceService.createCardInstance(data);
  }
}
