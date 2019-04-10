import { EntityParent } from '@pardjs/common';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('User')
export class User extends EntityParent {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  name: string;

  @Index('idx-user-username-unique', { unique: true, sparse: true })
  @Column()
  username: string;

  @Index('idx-user-email-unique', { unique: true, sparse: true })
  @Column()
  email: string;

  @Index('idx-user-mobile-unique', { unique: true, sparse: true })
  @Column()
  mobile: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isMobileVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isDisabled: boolean;

  @Column({ name: 'password', nullable: true })
  password: string;

  @ManyToMany(type => Role, role => role.users, { cascade: false })
  @JoinTable({ name: 'User_Role_Link' })
  roles: Role[];
}
