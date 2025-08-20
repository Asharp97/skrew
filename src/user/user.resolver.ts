import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'types/user/user.model';
import { Prisma } from '@prisma/client';
import { UserUpdateInput } from 'types/user/user-update.input';
import { UserUncheckedCreateInput } from 'types/user/user-unchecked-create.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'GetUsers' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User, { name: 'GetUser' })
  async getUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.userService.getUser(id);
  }

  @Mutation(() => User, { name: 'DeleteUser' })
  async deleteUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => User, { name: `UpdateUser` })
  async updateUser(
    @Args({ name: `id`, type: () => String }) id: string,
    @Args({ name: `data`, type: () => UserUpdateInput })
    data: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => User, { name: 'CreateUser' })
  async createUser(
    @Args('data', { type: () => UserUncheckedCreateInput })
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<User> {
    return await this.userService.createUser(data);
  }
}
