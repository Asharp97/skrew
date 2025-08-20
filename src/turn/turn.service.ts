import { Injectable } from '@nestjs/common';
import { Turn, Prisma } from '@prisma/client';
import { TurnRepository } from './turn.repository';

@Injectable()
export class TurnService {
  constructor(private repo: TurnRepository) {}
  async getTurns(): Promise<Turn[]> {
    return await this.repo.getTurns();
  }

  async getTurn(id: string): Promise<Turn | null> {
    return await this.repo.getTurn(id);
  }

  async deleteTurn(id: string): Promise<Turn | null> {
    return await this.repo.deleteTurn(id);
  }

  async updateTurn(
    id: string,
    data: Prisma.TurnUpdateInput,
  ): Promise<Turn | null> {
    return await this.repo.updateTurn({ where: { id }, data });
  }

  async createTurn(data: Prisma.TurnUncheckedCreateInput): Promise<Turn> {
    return await this.repo.createTurn(data);
  }
}
