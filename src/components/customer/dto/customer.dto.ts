import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPhoneNumber, IsString, MaxDate, MinLength } from "class-validator";

export class CreateCustomerDto {
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

    @IsNumber()
    @IsNotEmpty()
    genderId: number;
}

export class UpdateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    genderId?: number;
}


export class GetCustomersQueryDto {
    @IsNumberString()
    @IsOptional()
    page: string;

    @IsNumberString()
    @IsOptional()
    limit: string;

    @IsNumberString()
    @IsOptional()
    genderId: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsNumberString()
    @IsOptional()
    @IsIn(['1', '0'])
    isDeleted: string;
} 
