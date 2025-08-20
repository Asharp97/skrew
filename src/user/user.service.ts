import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repo: UserRepository) {}
  async getUsers(): Promise<User[]> {
    return await this.repo.getUsers();
  }

  async getUser(id: string): Promise<User | null> {
    return await this.repo.getUser(id);
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.repo.deleteUser(id);
  }

  async updateUser(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    return await this.repo.updateUser({ where: { id }, data });
  }

  async createUser(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return await this.repo.createUser(data);
  }
}
