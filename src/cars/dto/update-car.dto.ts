import {
    IsDateString,
    IsNumber,
    ValidateNested,
    IsOptional
} from 'class-validator';

import { CreateManufacturerDto } from './create-manufacturer.dto';
import { CreateOwnerDto } from './create-owner.dto';

export class UpdateCarDto {
    @IsOptional()
    @ValidateNested()
    readonly manufacturer: CreateManufacturerDto;
    @IsOptional()
    @IsNumber()
    readonly price: number;
    @IsOptional()
    @IsDateString()
    readonly firstRegistrationDate: string;
    @IsOptional()
    @ValidateNested()
    readonly owners: CreateOwnerDto[];
}