import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserFactory } from '../factories/user.factory';
import { computePhonenumber } from '../utils/string.utils';
import { getManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ServiceMethodOptions } from '../../../shared/interfaces/service-method-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../enum/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}

    async checkDuplicatePhoneNumber(phoneCode: string, phoneNumber: string) {
        const computedPhoneNumber = computePhonenumber(phoneCode, phoneNumber);
        const user = await this.userRepo.findOne({ where: { phoneNumber: computedPhoneNumber } });
        if (user) {
            throw new ConflictException("Phone number is associated with a different account");
        }
    }

    async checkDuplicateEmail(email: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user) {
            throw new ConflictException("Email is associated with a different account");
        }
    }

    public async create(data: CreateUserDto) {
        await getManager().transaction(async entityManager => {
            await this.checkDuplicateEmail(data.email);
            await this.checkDuplicatePhoneNumber(data.phoneCode, data.phoneNumber);
            const role = UserRole.CUSTOMER;
            const userAttribute = UserFactory.create({ ...data, role });
            return this.save(userAttribute, { entityManager });
        });
    }

    async findByUserId(id: string): Promise<User> {
        return this.userRepo.findOne({ where: { id }, relations: ['gender'] });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepo.findOne({ where: { email } });
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { phoneNumber } });
        if (!user) return undefined

        return user;
    }

    async save(user: User, options: ServiceMethodOptions = {}): Promise<User> {
        const { entityManager } = options;
        if (entityManager) return entityManager.save(user);
        return await this.userRepo.save(user);
    }

    async update(user: User, data: Partial<User>) {
        return await this.userRepo.save({ ...user, ...data });
    }

    async findByToken(token: string): Promise<User> {
        return this.userRepo.findOne({ where: { confirmationToken: token } });
    }
}
