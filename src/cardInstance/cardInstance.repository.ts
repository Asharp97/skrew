import { Injectable } from '@nestjs/common';
import { CardInstance, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardInstanceRepository {
  constructor(private prisma: PrismaService) {}

  async getCardInstances(): Promise<CardInstance[]> {
    return this.prisma.cardInstance.findMany();
  }

  async getCardInstance(id: string): Promise<CardInstance | null> {
    return this.prisma.cardInstance.findUnique({ where: { id } });
  }

  async deleteCardInstance(id: string): Promise<CardInstance | null> {
    return this.prisma.cardInstance.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateCardInstance(params: {
    where: Prisma.CardInstanceWhereUniqueInput;
    data: Prisma.CardInstanceUpdateInput;
  }): Promise<CardInstance | null> {
    return this.prisma.cardInstance.update(params);
  }

  async createCardInstance(
    data: Prisma.CardInstanceUncheckedCreateInput,
  ): Promise<CardInstance> {
    return this.prisma.cardInstance.create({ data });
  }
}
