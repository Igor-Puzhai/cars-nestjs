import {
    IsDateString,
    IsNumber,
    ValidateNested,
    IsOptional,
    IsString
} from 'class-validator';

import { CreateOwnerDto } from './create-owner.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCarDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly manufacturerId: string;
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly price: number;
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    readonly firstRegistrationDate: string;
    @ApiProperty()
    @IsOptional()
    @ValidateNested()
    readonly owners: CreateOwnerDto[];
}