import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CardService } from './card.service';
import { Card } from 'types/card/card.model';
import { Prisma } from '@prisma/client';
import { CardUpdateInput } from 'types/card/card-update.input';
import { CardUncheckedCreateInput } from 'types/card/card-unchecked-create.input';

@Resolver()
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Query(() => [Card], { name: 'GetCards' })
  async getCards(): Promise<Card[]> {
    return this.cardService.getCards();
  }

  @Query(() => Card, { name: 'GetCard' })
  async getCard(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Card | null> {
    return this.cardService.getCard(id);
  }

  @Mutation(() => Card, { name: 'DeleteCard' })
  async deleteCard(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Card | null> {
    return this.cardService.deleteCard(id);
  }

  @Mutation(() => Card, { name: `UpdateCard` })
  async updateCard(
    @Args({ name: `id`, type: () => String }) id: string,
    @Args({ name: `data`, type: () => CardUpdateInput })
    data: Prisma.CardUpdateInput,
  ): Promise<Card | null> {
    return await this.cardService.updateCard(id, data);
  }

  @Mutation(() => Card, { name: 'CreateCard' })
  async createCard(
    @Args('data', { type: () => CardUncheckedCreateInput })
    data: Prisma.CardUncheckedCreateInput,
  ): Promise<Card> {
    return await this.cardService.createCard(data);
  }
}
