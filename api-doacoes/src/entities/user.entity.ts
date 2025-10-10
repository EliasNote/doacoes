import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Campaign } from './campaign.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  password: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  created_at: Date = new Date();

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];
}
