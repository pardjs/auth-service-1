import { PostgresEntityParent } from '@pardjs/common';
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
export class User extends PostgresEntityParent {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  name: string;

  @Column({default: true, nullable: true})
  shownInApp: boolean;

  @Index('idx-user-username-unique', { unique: true, sparse: true })
  @Column({ nullable: true })
  username: string;

  @Index('idx-user-email-unique', { unique: true, sparse: true })
  @Column({ nullable: true })
  email: string;

  @Index('idx-user-mobile-unique', { unique: true, sparse: true })
  @Column({ nullable: true })
  mobile: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isMobileVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isDisabled: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'password', nullable: true })
  password: string;

  @ManyToMany(type => Role, role => role.users, { cascade: false, eager: true })
  @JoinTable({ name: 'User_Role_Link' })
  roles: Role[];
}
