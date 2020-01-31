import {
    IsNotEmpty,
    IsString,
    IsDateString
} from 'class-validator';

export class CreateOwnerDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsDateString()
    readonly purchaseDate: string;
}