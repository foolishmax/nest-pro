import { Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  providers: [OSSResolver, OSSService],
})
export class OSSModule {}
