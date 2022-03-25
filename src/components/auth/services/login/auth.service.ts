import {  ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../dto/login.dto';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/services/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserFactory } from '../../../user/factories/user.factory';
import { LoginInput } from '../../interfaces/auth.service';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly config: ConfigService ){}
    public async login(input: LoginInput) : Promise<{token: string}>{
        const defaultErrorMessage = 'Email or password is incorrect';

        try {
            const user = await this.userService.findByEmail(input.email);
            if (!user) throw new Error(defaultErrorMessage);

            const isValidPassword = await user.comparePassword(input.password);
            if(!isValidPassword) throw new Error(defaultErrorMessage);

            const token = await this.generateJwtToken(user);
            return { token }
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    public async generateJwtToken(user: User): Promise<string> {
        const payload = UserFactory.generateJwt(user);
        return jwt.sign(
            payload,
            this.config.get('jwt.JWT_AUTH_SECRET'),
            { expiresIn: this.config.get('jwt.EXPIRES_IN') }
        );
    }
}
