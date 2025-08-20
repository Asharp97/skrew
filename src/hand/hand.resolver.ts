import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { HandService } from './hand.service';
import { Hand } from 'types/hand/hand.model';
import { Prisma } from '@prisma/client';
import { HandUpdateInput } from 'types/hand/hand-update.input';
import { HandUncheckedCreateInput } from 'types/hand/hand-unchecked-create.input';

@Resolver()
export class HandResolver {
  constructor(private readonly handService: HandService) {}

  @Query(() => [Hand], { name: 'GetHands' })
  async getHands(): Promise<Hand[]> {
    return this.handService.getHands();
  }

  @Query(() => Hand, { name: 'GetHand' })
  async getHand(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Hand | null> {
    return this.handService.getHand(id);
  }

  @Mutation(() => Hand, { name: 'DeleteHand' })
  async deleteHand(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Hand | null> {
    return this.handService.deleteHand(id);
  }

  @Mutation(() => Hand, { name: `UpdateHand` })
  async updateHand(
    @Args({ name: `id`, type: () => String }) id: string,
    @Args({ name: `data`, type: () => HandUpdateInput })
    data: Prisma.HandUpdateInput,
  ): Promise<Hand | null> {
    return await this.handService.updateHand(id, data);
  }

  @Mutation(() => Hand, { name: 'CreateHand' })
  async createHand(
    @Args('data', { type: () => HandUncheckedCreateInput })
    data: Prisma.HandUncheckedCreateInput,
  ): Promise<Hand> {
    return await this.handService.createHand(data);
  }
}
