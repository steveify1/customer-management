import { forwardRef, Module, NotFoundException } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerService } from './services/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { GenderModule } from '../gender/gender.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => UserModule),
    forwardRef(() => GenderModule),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
  ],
  exports: [CustomerService]
})
export class CustomerModule {}
