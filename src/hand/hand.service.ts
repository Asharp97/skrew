import { Injectable } from '@nestjs/common';
import { Hand, Prisma } from '@prisma/client';
import { HandRepository } from './hand.repository';

@Injectable()
export class HandService {
  constructor(private repo: HandRepository) {}
  async getHands(): Promise<Hand[]> {
    return await this.repo.getHands();
  }

  async getHand(id: string): Promise<Hand | null> {
    return await this.repo.getHand(id);
  }

  async deleteHand(id: string): Promise<Hand | null> {
    return await this.repo.deleteHand(id);
  }

  async updateHand(
    id: string,
    data: Prisma.HandUpdateInput,
  ): Promise<Hand | null> {
    return await this.repo.updateHand({ where: { id }, data });
  }

  async createHand(data: Prisma.HandUncheckedCreateInput): Promise<Hand> {
    return await this.repo.createHand(data);
  }
}
