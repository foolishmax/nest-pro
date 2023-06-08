import {
  ACCOUNT_NOT_EXIST,
  CODE_NOT_EXIST,
  CODE_NOT_EXPIRE,
  LOGIN_ERROR,
  SUCCESS,
} from '@/common/constants';
import { Result } from '@/common/dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as dayjs from 'dayjs';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Result, { description: '发送验证码' })
  async sendCodeMsg(@Args('phone') phone: string) {
    return this.authService.sendCodeMsg(phone);
  }

  @Mutation(() => Result, { description: '登陆' })
  async login(@Args('phone') phone: string, @Args('code') code: string) {
    const user = await this.userService.findByTel(phone);
    if (!user) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    }
    if (!user.codeCreateTimeAt || !user.code) {
      return {
        code: CODE_NOT_EXIST,
        message: '验证码不存在',
      };
    }
    if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000) {
      return {
        code: CODE_NOT_EXPIRE,
        message: '验证码过期',
      };
    }
    if (user.code === code) {
      const token = '123123';
      return {
        code: SUCCESS,
        message: '登录成功',
        data: token,
      };
    }
    return {
      code: LOGIN_ERROR,
      message: '登录失败，手机号或者验证码不对',
    };
  }
}
