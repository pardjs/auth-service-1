import { EntityParent } from '@pardjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('LoginSession')
export class LoginSession extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;
}
