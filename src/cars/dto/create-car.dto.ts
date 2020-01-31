import {
    IsNotEmpty,
    IsDateString,
    IsNumber,
    ValidateNested
} from 'class-validator';

import { CreateManufacturerDto } from './create-manufacturer.dto';
import { CreateOwnerDto } from './create-owner.dto';

export class CreateCarDto {
    @IsNotEmpty()
    @ValidateNested()
    readonly manufacturer: CreateManufacturerDto;
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
    @IsNotEmpty()
    @IsDateString()
    readonly firstRegistrationDate: string;
    @IsNotEmpty()
    @ValidateNested()
    readonly owners: CreateOwnerDto[];
}