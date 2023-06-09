import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Page } from './page.type';

@ObjectType()
export class Result<T = string> {
  @Field(() => Int)
  code: number;
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => String, { nullable: true })
  data?: T;
  @Field(() => String, { nullable: true })
  page?: Page;
}
