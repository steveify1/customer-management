import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { SuccessResponse } from '../../../../shared/utils/response.utils';
import { LoginDto } from '../../dto/login.dto';
import { AuthService } from '../../services/login/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('login')
    @HttpCode(200)
    public async loginUser(
        @Body() body: LoginDto,
    ) {
        const token = await this.authService.login(body);
        return SuccessResponse("Successfully logged in", { token });
    }

}
