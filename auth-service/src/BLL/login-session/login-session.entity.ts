import { PostgresEntityParent } from '@pardjs/common-1';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('LoginSession')
export class LoginSession extends PostgresEntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;
}
