import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  // constructor(private readonly userService: UserService) {}
  // @Get('/create')
  // async create(): Promise<boolean> {
  //   console.log('/create');
  //   return await this.userService.create({
  //     name: 'lbs',
  //   });
  // }
  // @Get('/del')
  // async del(): Promise<boolean> {
  //   return await this.userService.del('3');
  // }
  // @Get('/update')
  // async update() {
  //   return await this.userService.update('6', {
  //     name: 'lbs123',
  //   });
  // }
  // @Get('/find')
  // async find(): Promise<User> {
  //   return await this.userService.find('lbs');
  // }
}
