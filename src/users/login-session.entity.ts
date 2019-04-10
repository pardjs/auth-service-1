import { EntityParent } from '@pardjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login_session')
export class LoginSession extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;
}
