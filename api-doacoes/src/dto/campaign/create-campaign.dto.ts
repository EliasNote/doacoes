import { IsString, IsNumberString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumberString()
  readonly goal_amount: string;

  @IsString()
  readonly user_id: string;
}
