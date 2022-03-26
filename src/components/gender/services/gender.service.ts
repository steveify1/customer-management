import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gender } from '../entities/gender.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenderInput } from '../interfaces/gender.interface';

@Injectable()
export class GenderService {
    constructor(
        @InjectRepository(Gender) private readonly genderRepo: Repository<Gender>,
    ) {}

    async checkDuplicate(normalizedName: string) {
        const gender = await this.genderRepo.findOne({ where: { normalizedName } });
        if (gender) {
            throw new BadRequestException('Another gender with a similar name already exists');
        }
    }

    async create(input: CreateGenderInput) {
        const normalizedName = input.name.toLowerCase();
        await this.checkDuplicate(normalizedName);
        const genderAttributes = new Gender();
        genderAttributes.name = input.name;
        genderAttributes.normalizedName = normalizedName;
        return this.genderRepo.save(genderAttributes);
    }

    async verify(id: string | number) {
        const gender = await this.genderRepo.findOne({ where: { id } });
        if (!gender) throw new NotFoundException('Gender not found');
        return gender;
    }

    async find(): Promise<Gender[]> {
        return this.genderRepo.find();
    }
}
