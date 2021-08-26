import { PostgresEntityParent } from '@pardjs/common-1';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('AuthPoint')
export class AuthPoint extends PostgresEntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx-auth_point-name-unique', { unique: true })
  @Column()
  name: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @ManyToMany(type => Role, role => role.authPoints, {})
  roles: Role[];
}
