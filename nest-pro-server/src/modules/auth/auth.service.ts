import { CODE_NOT_EXPIRE, SUCCESS, UPDATE_ERROR } from '@/common/constants';
import { Result } from '@/common/dto';
import { getRandomCode } from '@/shared/utils';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async sendCodeMsg(phone: string): Promise<Result> {
    const code = getRandomCode();
    const user = await this.userService.findByTel(phone);
    console.log('user', user);
    if (user) {
      // 60s内只允许发送一次
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 60 * 1000) {
        return {
          code: CODE_NOT_EXPIRE,
          message: '操作太频繁，请稍后重试',
        };
      }

      const result = await this.userService.updateCode(user.id, code);
      return result
        ? {
            code: SUCCESS,
            message: '验证码更新成功，验证码：' + code,
          }
        : {
            code: UPDATE_ERROR,
            message: '验证码更新失败',
          };
    }

    const result = await this.userService.create({
      phone,
      code,
      codeCreateTimeAt: new Date(),
    });
    return result
      ? { code: SUCCESS, message: '获取验证码成功,验证码：' + code }
      : { code: UPDATE_ERROR, message: '新建账号失败' };
  }
}
