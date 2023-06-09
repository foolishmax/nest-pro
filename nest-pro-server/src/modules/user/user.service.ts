import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if (res?.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async update(id: number, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async getUserInfo(id: number): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  /** 通过手机号查询用户 */
  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: { phone: tel },
    });
    return res;
  }

  /** 根据用户id更新code验证码 */
  async updateCode(id: number, code: string) {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreateTimeAt: new Date(),
    });
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
