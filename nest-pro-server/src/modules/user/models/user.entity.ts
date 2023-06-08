import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '手机号',
    nullable: true,
  })
  phone: string;

  @Column({
    comment: '验证码',
    nullable: true,
  })
  code: string;

  @Column({
    comment: '验证码创建时间',
    nullable: true,
  })
  codeCreateTimeAt: Date;
}
