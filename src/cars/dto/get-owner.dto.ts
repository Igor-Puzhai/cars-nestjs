import {ApiProperty} from "@nestjs/swagger";

export class GetOwnerDto {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly purchaseDate: string;
}