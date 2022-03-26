import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, MaxDate, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class GetUsersQueryDto {
    @IsNumberString()
    @IsOptional()
    page: string;

    @IsNumberString()
    @IsOptional()
    limit: string;
} 
