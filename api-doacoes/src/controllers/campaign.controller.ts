import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCampaignDto } from 'src/dto/campaign/create-campaign.dto';
import { CampaignService } from 'src/services/campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }
}
