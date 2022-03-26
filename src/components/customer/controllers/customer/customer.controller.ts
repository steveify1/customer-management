import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserRole } from '../../../user/enum/role.enum';
import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { RoleGuard } from '../../../../shared/guards/role.guard';
import { SuccessResponse } from '../../../../shared/utils/response.utils';
import { CreateCustomerDto, GetCustomersQueryDto, UpdateCustomerDto } from '../../dto/customer.dto';
import { CustomerService } from '../../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}

    @Post()
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(201)
    public async createCustomer(
        @Req() req: any,
        @Body() body: CreateCustomerDto,
    ) {
        const customer = await this.customerService.create(body, { currentUser: req.user });
        return SuccessResponse("Customer was successfully created", customer);
    }

    @Get()
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getCustomers(
        @Req() req: any,
        @Query() query: GetCustomersQueryDto
    ) {
        const { pagination } = req;
        const customers = await  this.customerService.find({ query, pagination }); 
        return SuccessResponse("Query successful", customers);
    }

    @Get("/:id")
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getCustomer(@Param('id') id: string) {
       const customer = await  this.customerService.findOne(id);    
       return SuccessResponse("Query successful", customer);
    }

    @Patch("/:id")
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async updateCustomer(
        @Param('id') id: string,
        @Body() body: UpdateCustomerDto,
    ) {
       const customer = await  this.customerService.update(id, body);    
       return SuccessResponse("Customer was updated successfully", customer);
    }

    @Delete("/:id")
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async deleteCustomer(@Param('id') id: string) {
       const customer = await  this.customerService.delete(id);    
       return SuccessResponse("Customer was successfully marked as deleted", customer);
    }
}
