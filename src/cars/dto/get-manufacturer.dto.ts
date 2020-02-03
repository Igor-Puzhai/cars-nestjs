import { ApiProperty } from '@nestjs/swagger';

export class GetManufacturerDto {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly phone: string;
    @ApiProperty()
    readonly siret: number;
}