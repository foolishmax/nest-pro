import { JWT_SECRET } from '@/common/constants';
import { ConsoleLogger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jsw.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 7 + 's',
      },
    }),
  ],
  providers: [
    ConsoleLogger,
    AuthService,
    AuthResolver,
    UserService,
    JwtStrategy,
  ],
})
export class AuthModule {}
