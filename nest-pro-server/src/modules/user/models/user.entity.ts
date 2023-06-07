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
}
