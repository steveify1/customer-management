import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserFactory } from '../factories/user.factory';
import { computePhonenumber } from '../utils/string.utils';
import { getManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ServiceMethodOptions } from '../../../shared/interfaces/service-method-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../enum/role.enum';
import { PaginatedResult } from 'src/shared/interfaces/paginated-result.interface';
import { CreateUserInput } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}

    async checkDuplicateEmail(email: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user) {
            throw new ConflictException("Email is associated with a different account");
        }
    }

    public async create(input: CreateUserInput) {
        return getManager().transaction(async entityManager => {
            await this.checkDuplicateEmail(input.email);
            const role = input.role || UserRole.ADMIN;
            const userAttribute = UserFactory.create({ ...input, role });
            return this.save(userAttribute, { entityManager });
        });
    }

    buildFilter(query: any) {
        const filter = {};
        return filter;
    }

    async find(options: ServiceMethodOptions): Promise<PaginatedResult<User>> {
        const { pagination } = options;
        const filter = this.buildFilter(options.query);
        const result = await this.userRepo.findAndCount({
            where: { ...filter },
            ...pagination,
        });
        return {
            records: result[0],
            count: result[1],
        }
    }

    async findOne(id: string): Promise<User> {
        const user = await this.findByUserId(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByUserId(id: string): Promise<User> {
        return this.userRepo.findOne({ where: { id } });
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
