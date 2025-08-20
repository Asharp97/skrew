import { Injectable } from '@nestjs/common';
import { Turn, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TurnRepository {
  constructor(private prisma: PrismaService) {}

  async getTurns(): Promise<Turn[]> {
    return this.prisma.turn.findMany();
  }

  async getTurn(id: string): Promise<Turn | null> {
    return this.prisma.turn.findUnique({ where: { id } });
  }

  async deleteTurn(id: string): Promise<Turn | null> {
    return this.prisma.turn.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateTurn(params: {
    where: Prisma.TurnWhereUniqueInput;
    data: Prisma.TurnUpdateInput;
  }): Promise<Turn | null> {
    return this.prisma.turn.update(params);
  }

  async createTurn(data: Prisma.TurnUncheckedCreateInput): Promise<Turn> {
    return this.prisma.turn.create({ data });
  }
}
