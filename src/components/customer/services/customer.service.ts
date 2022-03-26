import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerFactory } from '../factories/customer.factory';
import { getManager, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { ServiceMethodOptions } from '../../../shared/interfaces/service-method-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResult } from 'src/shared/interfaces/paginated-result.interface';
import { CreateCustomerInput, UpdateCustomerInput } from '../interfaces/customer.interface';
import { GenderService } from 'src/components/gender/services/gender.service';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @Inject(forwardRef(() => GenderService)) private readonly genderService: GenderService,
    ) {}

    async verify(id: string | number) {
        const customer = await this.customerRepo.findOne({ where: { id } });
        if (!customer) throw new NotFoundException('Customer not found');
        return customer;
    }

    async checkDuplicateEmail(email: string) {
        const customer = await this.customerRepo.findOne({ where: { email } });
        if (customer) {
            throw new ConflictException("Email is associated with another customer.");
        }
    }

    public async create(input: CreateCustomerInput, options: ServiceMethodOptions) {
        return getManager().transaction(async entityManager => {
            await this.checkDuplicateEmail(input.email);
            await this.genderService.verify(input.genderId);
            const customerAttribute = CustomerFactory.create({
                ...input,
                creatorId: options.currentUser.id,
            });
            return this.save(customerAttribute, { entityManager });
        });
    }

    buildFilter(query: any) {
        const filter = {};

        if (query.genderId) {
            filter['genderId'] = query.genderId;
        }

        if (query.isDeleted) {
            filter['isDeleted'] = Boolean(Number(query.isDeleted));
        }

        if (query.email) {
            filter['email'] = query.email;
        }

        return filter;
    }

    async find(options: ServiceMethodOptions): Promise<PaginatedResult<Customer>> {
        const { pagination } = options;
        const filter = this.buildFilter(options.query);
        const result = await this.customerRepo.findAndCount({
            where: { ...filter, },
            relations: ['gender'],
            ...pagination,
        });
        return {
            records: result[0],
            count: result[1],
        }
    }

    async findOne(id: string): Promise<Customer> {
        const customer = await this.findByCustomerId(id);
        if (!customer) throw new NotFoundException('Customer not found');
        return customer;
    }

    async findByCustomerId(id: string): Promise<Customer> {
        return this.customerRepo.findOne({
            where: { id },
            relations: ['gender', 'creator']
        });
    }

    async findByEmail(email: string): Promise<Customer> {
        return this.customerRepo.findOne({ where: { email } });
    }

    async save(Customer: Customer, options: ServiceMethodOptions = {}): Promise<Customer> {
        const { entityManager } = options;
        if (entityManager) return entityManager.save(Customer);
        return await this.customerRepo.save(Customer);
    }

    async update(id: string | number, input: UpdateCustomerInput) {
        const customer = await this.verify(id);
        
        if (input.email && customer.email != input.email) {
            await this.checkDuplicateEmail(input.email);
        }

        if (input.genderId && customer.genderId != input.genderId) {
            await this.genderService.verify(input.genderId);
        }

        return await this.customerRepo.save({ ...customer, ...input });
    }

    async delete(id: number | string) {
        const customer = await this.verify(id);

        if (customer.isDeleted) {
            throw new BadRequestException('This customer has already been marked as deleted');
        }

        return this.save({ ...customer, isDeleted: true });
    }
}
