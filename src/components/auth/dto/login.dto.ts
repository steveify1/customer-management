import { IsEmail, IsOptional, isString, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    password: string;

    @IsString()
    @IsEmail()
    email: string;
}