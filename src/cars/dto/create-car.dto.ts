import {
    IsNotEmpty,
    IsDateString,
    IsNumber,
    ValidateNested,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateOwnerDto } from './create-owner.dto';

export class CreateCarDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    manufacturerId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly firstRegistrationDate: string;
    @ApiProperty({
        type: [CreateOwnerDto]
    })
    @IsNotEmpty()
    @ValidateNested()
    readonly owners: CreateOwnerDto[];
}