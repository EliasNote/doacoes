import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDonationDto } from 'src/dto/donation/create-donation.dto';
import { DonationService } from 'src/services/donation.service';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationService.create(createDonationDto);
  }

  @Get()
  findAll() {
    return this.donationService.findAll();
  }
}
