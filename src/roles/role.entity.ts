import { EntityParent } from '@pardjs/common';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthPoint } from '../auth-points/auth-point.entity';
import { User } from '../users/user.entity';

@Entity('Role')
export class Role extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx-role-name-unique', { unique: true })
  @Column()
  name: string;

  @Column({nullable: true, default: false})
  isDefault: boolean;

  @Column({ nullable: true, default: false })
  shownInApp: boolean;

  @ManyToMany(type => User, user => user.roles)
  users: User[];

  @ManyToMany(type => AuthPoint, authPoint => authPoint.roles, {
    cascade: false,
  })
  @JoinTable({ name: 'AuthPoint_Role_Link' })
  authPoints: AuthPoint[];
}
