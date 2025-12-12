import {
  IsString,
  IsNumberString,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { DonationStatus } from '../../entities/donation.entity';

export class CreateDonationDto {
  @IsUUID()
  readonly campaign_id: string;

  @IsUUID()
  readonly user_id: string;

  @IsString()
  @IsOptional()
  readonly payment_method?: string;

  @IsString()
  readonly name?: string;

  @IsString()
  readonly cpf?: string;

  @IsNumberString()
  readonly amount: string;

  @IsEnum(DonationStatus)
  @IsOptional()
  readonly status?: DonationStatus;
}
