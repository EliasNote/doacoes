import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from 'src/dto/campaign/create-campaign.dto';
import { Campaign, CampaignStatus } from 'src/entities/campaign.entity';
import { ResponseCampaignDto } from 'src/dto/campaign/response-campaign.dto';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    private userService: UserService,
  ) {}

  async create(
    createCampaignDto: CreateCampaignDto,
  ): Promise<ResponseCampaignDto> {
    const { user_id, ...rest } = createCampaignDto;
    const campaign = this.campaignRepository.create({
      ...rest,
      user: { id: user_id },
    });
    const saved = await this.campaignRepository.save(campaign);
    const fullCampaign = await this.campaignRepository.findOne({
      where: { id: saved.id },
      relations: ['donations'],
    });
    const current_amount = this.calculateTotalDonated(fullCampaign!);
    return this.createResponseDto(fullCampaign!, current_amount);
  }

  async findAll() {
    const campaigns = await this.campaignRepository.find({
      relations: ['donations'],
    });
    return campaigns.map((c) => {
      const current_amount = this.calculateTotalDonated(c);
      return {
        id: c.id,
        title: c.title,
        description: c.description,
        goal_amount: c.goal_amount,
        status: c.status,
        created_at: c.created_at,
        end_date: c.end_date,
        updated_at: c.updated_at,
        current_amount,
      };
    });
  }

  async findOne(id: string): Promise<ResponseCampaignDto | null> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['donations'],
    });
    if (!campaign) return null;
    const current_amount = this.calculateTotalDonated(campaign);

    return this.createResponseDto(campaign, current_amount);
  }

  async findOneCampaign(id: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['donations'],
    });
    if (!campaign) return null;
    return campaign;
  }

  async update(id: string, query: Record<string, string>) {
    const dto = {
      title: query.title,
      description: query.description,
      goal_amount: query.goal_amount,
      end_date: query.end_date,
      user_id: query.user_id,
      status: query.status,
    };

    const campaign: Campaign | null = await this.findOneCampaign(id);

    if (campaign == null)
      throw new NotFoundException('Campanha não cadastrada');

    if (dto.title != null) campaign.title = dto.title;
    if (dto.description != null) campaign.description = dto.description;
    if (dto.goal_amount != null) campaign.goal_amount = dto.goal_amount;
    if (dto.end_date != null) campaign.end_date = new Date(dto.end_date);
    if (dto.user_id != null) {
      const user: User = await this.userService.findOne(dto.user_id);
      campaign.user = user;
    }
    if (dto.status != null) campaign.status = dto.status as CampaignStatus;

    await this.campaignRepository.update(id, campaign);
  }

  private calculateTotalDonated(campaign: Campaign): string {
    if (!campaign.donations || campaign.donations.length === 0) return '0.00';
    return campaign.donations
      .reduce((sum, d) => sum + Number(d.amount), 0)
      .toFixed(2);
  }

  private createResponseDto(campaign: Campaign, current_amount: string) {
    return new ResponseCampaignDto(
      campaign.id,
      campaign.title,
      campaign.description,
      campaign.goal_amount,
      campaign.status,
      campaign.created_at,
      campaign.end_date,
      campaign.updated_at,
      campaign.donations,
      current_amount,
    );
  }
}
