import { EntityParent } from '@pardjs/common';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shipment } from '../shipments/shipment.entity';
import { UserRoles } from './user-roles';

@Entity('user')
export class User extends EntityParent {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'show_name' })
  showName: string;

  // Multiple roles will be separated by comma.
  @Column({
    name: 'roles',
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.SHIPMENT_MANAGER,
  })
  role: string;

  @OneToMany(type => Shipment, shipment => shipment.createdByUser)
  shipments: Shipment[];
}
