import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('/pix')
  createpix(@Query() query: Record<string, string>) {
    return this.donationService.create(query as any);
  }
}
