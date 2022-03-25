import {  forwardRef, Logger, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/login/auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ConfigModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    Logger
  ],
  exports: [AuthService]
})
export class AuthModule {}
