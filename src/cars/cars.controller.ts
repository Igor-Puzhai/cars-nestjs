import {Controller, Get, Param, Post, Body, Delete, Put, BadRequestException, Response} from '@nestjs/common';
import {ApiResponse} from "@nestjs/swagger";

import { CarsService } from './cars.service'
import { Manufacturer } from "../interfaces/manufacturer.interface";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { GetManufacturerDto } from "./dto/get-manufacturer.dto";
import { GetCarDto } from "./dto/get-car.dto";

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    @ApiResponse({
        type: GetCarDto,
        isArray: true,
        status: 200
    })
    findAll(): GetCarDto[] {
        return this.carsService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        type: GetCarDto,
        status: 200
    })
    findOne(@Param('id') id: string): GetCarDto {
        return this.carsService.findById(id);
    }

    @Get(':id/manufacturer')
    @ApiResponse({
        type: GetManufacturerDto
    })
    findOneManufacturer(@Param('id') id: string): Manufacturer {
        return this.carsService.findManufacturerByCarId(id);
    }

    @Post()
    create(@Body() createCarDto: CreateCarDto): string {
        this.carsService.create(createCarDto);
        return 'car created';
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateCarDto: UpdateCarDto): string {
        const result: string = this.carsService.update(id, updateCarDto);

        if (result !== 'car updated') {
            throw new BadRequestException(result);
        }

        return result;
    }

    @Delete(':id')
    deleteOne(@Param('id') id) {
        this.carsService.deleteById(id);
        return 'car deleted';
    }

    @Post('/remove-old-owners-apply-discount')
    trigger(): string {
        this.carsService.removeOwnersBeforeLast18Months();
        this.carsService.applyDiscount();
        return 'triggered discount and old owners cleanup';
    }
}
