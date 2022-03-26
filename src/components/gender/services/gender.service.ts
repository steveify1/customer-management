import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gender } from '../entities/gender.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenderService {
    constructor(
        @InjectRepository(Gender) private readonly GenderRepo: Repository<Gender>,
    ) {}

    async find(): Promise<Gender[]> {
        return this.GenderRepo.find();
    }
}
