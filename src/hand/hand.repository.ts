import { Injectable } from '@nestjs/common';
import { Hand, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HandRepository {
  constructor(private prisma: PrismaService) {}

  async getHands(): Promise<Hand[]> {
    return this.prisma.hand.findMany();
  }

  async getHand(id: string): Promise<Hand | null> {
    return this.prisma.hand.findUnique({ where: { id } });
  }

  async deleteHand(id: string): Promise<Hand | null> {
    return this.prisma.hand.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateHand(params: {
    where: Prisma.HandWhereUniqueInput;
    data: Prisma.HandUpdateInput;
  }): Promise<Hand | null> {
    return this.prisma.hand.update(params);
  }

  async createHand(data: Prisma.HandUncheckedCreateInput): Promise<Hand> {
    return this.prisma.hand.create({ data });
  }
}
