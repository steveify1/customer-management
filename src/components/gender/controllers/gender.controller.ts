import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '../../user/enum/role.enum';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { RoleGuard } from '../../../shared/guards/role.guard';
import { SuccessResponse } from '../../../shared/utils/response.utils';
import { GenderService } from '../services/gender.service';
import { CreateGenderDto } from '../dto/gender.dto';

@Controller('v1/genders')
export class GenderController {
    constructor(
        private readonly genderService: GenderService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    public async createGender(
        @Body() body: CreateGenderDto,
    ) {
       const gender = await this.genderService.create(body);
       return SuccessResponse("New gender was added successfully", gender);
    }

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getGenders() {
       const genders = await  this.genderService.find();    
       return SuccessResponse("Query successful", genders);
    }
}
