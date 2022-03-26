import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { RoleGuard } from '../../../../shared/guards/role.guard';
import { SuccessResponse } from '../../../../shared/utils/response.utils';
import { CreateUserDto } from '../../dto/user.dto';
import { UserRole } from '../../enum/role.enum';
import { UserService } from '../../services/user.service';

@Controller('v1/users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post()
    @UseGuards(new RoleGuard([UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(201)
    public async createUser(@Body() body: CreateUserDto) {
        const user = await this.userService.create(body);
        return SuccessResponse("Successfully created an account", user);
    }

    @Get()
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getUsers(
        @Req() req: any,
        @Query() query: any
    ) {
        const { pagination } = req;
        const users = await  this.userService.find({ query, pagination }); 
        return SuccessResponse("Query successful", users);
    }

    @Get("/:id")
    @UseGuards(new RoleGuard([UserRole.ADMIN, UserRole.SUPERADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getUser(@Param('id') id: string, ) {
       const user = await  this.userService.findOne(id);    
       return SuccessResponse("Query successful", user);
    }
}
