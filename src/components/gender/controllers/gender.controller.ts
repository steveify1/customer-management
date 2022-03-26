import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UserRole } from '../../user/enum/role.enum';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { RoleGuard } from '../../../shared/guards/role.guard';
import { SuccessResponse } from '../../../shared/utils/response.utils';
import { GenderService } from '../services/gender.service';

@Controller('v1/genders')
export class GenderController {
    constructor(
        private readonly GenderService: GenderService
    ){}

    @Get()
    @UseGuards(new RoleGuard([UserRole.ADMIN]))
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async getGenders() {
       const genders = await  this.GenderService.find();    
       return SuccessResponse("Query successful", genders);
    }
}
