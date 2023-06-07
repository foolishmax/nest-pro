import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user.input.type';
import { UserType } from './dto/user.type';
import { Inject } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    console.log('999');
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: '根据id获取用户' })
  async find(@Args('id', { type: () => Int }) id: number): Promise<UserType> {
    return await this.userService.find(id);
  }

  @Mutation(() => Boolean, { description: '更新用户' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<boolean> {
    return await this.userService.update(id, params);
  }

  @Mutation(() => Boolean, { description: '删除用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }
}
