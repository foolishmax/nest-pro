import { GqlAuthGuard } from '@/common/guards';
import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { OSSType } from './.dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OSSResolver {
  @Inject(OSSService)
  private readonly ossService: OSSService;

  @Query(() => OSSType, { description: '获取oss相关信息' })
  async getOSSInfo(): Promise<OSSType> {
    return await this.ossService.getSignature();
  }
}
