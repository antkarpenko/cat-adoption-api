import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}