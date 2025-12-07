import { Donation } from '../../entities/donation.entity';
import { CampaignStatus } from '../../entities/campaign.entity';

export class ResponseCampaignDto {
  id: string;
  user_id: string;
  title: string;
  description: string;
  goal_amount: string;
  status: CampaignStatus;
  created_at: Date;
  end_date?: Date;
  updated_at: Date;
  donations: Donation[];
  current_amount: string;

  constructor(
    id: string,
    user_id: string,
    title: string,
    description: string,
    goal_amount: string,
    status: CampaignStatus,
    created_at: Date,
    end_date: Date | undefined,
    updated_at: Date,
    donations: Donation[],
    current_amount: string,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.goal_amount = goal_amount;
    this.status = status;
    this.created_at = created_at;
    this.end_date = end_date;
    this.updated_at = updated_at;
    this.donations = donations;
    this.current_amount = current_amount;
  }
}
