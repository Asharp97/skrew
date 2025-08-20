import { Injectable } from '@nestjs/common';
import { CardInstance, Prisma } from '@prisma/client';
import { CardInstanceRepository } from './cardInstance.repository';

@Injectable()
export class CardInstanceService {
  constructor(private repo: CardInstanceRepository) {}
  async getCardInstances(): Promise<CardInstance[]> {
    return await this.repo.getCardInstances();
  }

  async getCardInstance(id: string): Promise<CardInstance | null> {
    return await this.repo.getCardInstance(id);
  }

  async deleteCardInstance(id: string): Promise<CardInstance | null> {
    return await this.repo.deleteCardInstance(id);
  }

  async updateCardInstance(
    id: string,
    data: Prisma.CardInstanceUpdateInput,
  ): Promise<CardInstance | null> {
    return await this.repo.updateCardInstance({ where: { id }, data });
  }

  async createCardInstance(
    data: Prisma.CardInstanceUncheckedCreateInput,
  ): Promise<CardInstance> {
    return await this.repo.createCardInstance(data);
  }
}
