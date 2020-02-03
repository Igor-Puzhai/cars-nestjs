import { ApiProperty } from '@nestjs/swagger';

import { GetManufacturerDto } from './get-manufacturer.dto';
import { GetOwnerDto } from './get-owner.dto'

export class GetCarDto {
    @ApiProperty()
    readonly id: string;
    @ApiProperty({
        type: GetManufacturerDto
    })
    readonly manufacturer: GetManufacturerDto;
    @ApiProperty()
    readonly price: number;
    @ApiProperty()
    readonly firstRegistrationDate: Date;
    @ApiProperty({
        type: [GetOwnerDto]
    })
    readonly owners: GetOwnerDto[];
}