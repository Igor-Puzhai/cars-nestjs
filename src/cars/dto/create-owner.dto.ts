import {
    IsNotEmpty,
    IsString,
    IsDateString
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateOwnerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly purchaseDate: string;
}