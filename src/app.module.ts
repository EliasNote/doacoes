import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Donation } from './entities/donation.entity';
import { UserController } from './controllers/user.controller';
import { SupabaseService } from './services/supabase.service';
import { CampaignController } from './controllers/campaign.controller';
import { CampaignService } from './services/campaign.service';
import { DonationController } from './controllers/donation.controller';
import { DonationService } from './services/donation.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Campaign, Donation]),
  ],
  controllers: [UserController, CampaignController, DonationController],
  providers: [SupabaseService, CampaignService, DonationService],
})
export class AppModule {}
