import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false})
    name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false})
    age: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false})
    breed: string;
}