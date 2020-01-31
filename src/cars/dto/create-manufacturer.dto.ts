import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsPhoneNumber
} from 'class-validator';

export class CreateManufacturerDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    readonly phone: string;
    @IsNotEmpty()
    @IsNumber()
    readonly siret: number;
}