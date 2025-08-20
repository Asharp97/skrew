import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardRepository {
  constructor(private prisma: PrismaService) {}

  async getCards(): Promise<Card[]> {
    return this.prisma.card.findMany();
  }

  async getCard(id: string): Promise<Card | null> {
    return this.prisma.card.findUnique({ where: { id } });
  }

  async deleteCard(id: string): Promise<Card | null> {
    return this.prisma.card.delete({
      where: { id },
    });
  }

  async updateCard(params: {
    where: Prisma.CardWhereUniqueInput;
    data: Prisma.CardUpdateInput;
  }): Promise<Card | null> {
    return this.prisma.card.update(params);
  }

  async createCard(data: Prisma.CardUncheckedCreateInput): Promise<Card> {
    return this.prisma.card.create({ data });
  }
}
