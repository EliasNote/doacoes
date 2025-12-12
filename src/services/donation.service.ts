import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation, DonationStatus } from 'src/entities/donation.entity';
import { CreateDonationDto } from 'src/dto/donation/create-donation.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
  ) {}

  create(createDonationDto: CreateDonationDto) {
    const { campaign_id, user_id, payment_method, ...rest } = createDonationDto;
    const donation = this.donationRepository.create({
      ...rest,
      status: DonationStatus.PAID,
      user_id,
      payment_method,
      campaign: { id: campaign_id },
    });
    return this.donationRepository.save(donation);
  }

  findAll() {
    return this.donationRepository.find();
  }

  async findByUser(userId: string): Promise<Donation[]> {
    return this.donationRepository.find({ where: { user_id: userId } });
  }
}
