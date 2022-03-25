import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { SuccessResponse } from '../../../../shared/utils/response.utils';
import { CreateUserDto } from '../../dto/user.dto';
import { UserService } from '../../services/user.service';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/auth/register")
    @HttpCode(201)
    public async registerUser(@Body() data: CreateUserDto) {
        await this.userService.create(data);
        return SuccessResponse("Successfully created an account");
    }

    @Get("/profile/me")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async fetchProfile(@Req() req) {
       const profile = await  this.userService.findByUserId(req.user.id);    
       return SuccessResponse("Successfully feched profile information", profile);
    }

    @Get("/users/:id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getUser(@Req() req, @Param('id') id: string, ) {
       const user = await  this.userService.findByUserId(req.user.id);    
       return SuccessResponse("Successfully feched user in", user);
    }
}
