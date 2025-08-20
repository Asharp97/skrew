import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
  constructor(private repo: CardRepository) {}
  async getCards(): Promise<Card[]> {
    return await this.repo.getCards();
  }

  async getCard(id: string): Promise<Card | null> {
    return await this.repo.getCard(id);
  }

  async deleteCard(id: string): Promise<Card | null> {
    return await this.repo.deleteCard(id);
  }

  async updateCard(
    id: string,
    data: Prisma.CardUpdateInput,
  ): Promise<Card | null> {
    return await this.repo.updateCard({ where: { id }, data });
  }

  async createCard(data: Prisma.CardUncheckedCreateInput): Promise<Card> {
    return await this.repo.createCard(data);
  }
}
