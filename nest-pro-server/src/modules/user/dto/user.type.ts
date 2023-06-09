import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;
  @Field({ description: '名称' })
  name?: string;
  @Field({ description: '手机号' })
  phone?: string;
}
