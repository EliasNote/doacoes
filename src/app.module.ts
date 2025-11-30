import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Campaign } from './entities/campaign.entity';
import { Donation } from './entities/donation.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
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
    TypeOrmModule.forFeature([User, Campaign, Donation]),
  ],
  controllers: [UserController, CampaignController, DonationController],
  providers: [UserService, CampaignService, DonationService],
})
export class AppModule {}
