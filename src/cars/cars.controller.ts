import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { CarPopulated } from '../interfaces/car.interface'
import { CarsService } from './cars.service'
import { Manufacturer } from "../interfaces/manufacturer.interface";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    findAll(): CarPopulated[] {
        return this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): CarPopulated {
        return this.carsService.findById(id);
    }

    @Get(':id/manufacturer')
    findOneManufacturer(@Param('id') id: string): Manufacturer {
        return this.carsService.findManufacturerById(id);
    }

    @Post()
    create(@Body() createCarDto: CreateCarDto): string {
        this.carsService.create(createCarDto);
        return 'car created';
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateCarDto: UpdateCarDto): string {
        this.carsService.update(id, updateCarDto);
        return 'car updated';
    }

    @Delete(':id')
    deleteOne(@Param('id') id) {
        this.carsService.deleteById(id);
        return 'car deleted';
    }

    @Post('/trigger')
    applyDiscount(): string {
        this.carsService.removeOwnersBeforeLast18Months();
        this.carsService.applyDiscount();
        return 'triggered discount and old owners cleanup';
    }
}
