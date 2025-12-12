import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';

export enum DonationStatus {
  PAID = 'paid',
  PENDING = 'pending',
  FAILED = 'failed',
}

@Entity('donation')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.donations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 11 })
  cpf: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'decimal', scale: 2, default: 0 })
  amount: string;

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.PENDING,
  })
  status: DonationStatus;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updated_at: Date;
}
