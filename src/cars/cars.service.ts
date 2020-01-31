import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car, CarPopulated } from '../interfaces/car.interface';
import { Manufacturer } from "../interfaces/manufacturer.interface";
import { Owner } from "../interfaces/owner.interface";
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: 'f6850b91-2014-4b8d-a8bd-0c80c0f4040d',
            manufacturerId: 'd3260179-910f-4f1c-b37d-4e855ed9be8e',
            price: 20000,
            firstRegistrationDate: new Date('2019-08-12T10:53:14.215Z'),
            ownerIds: ['c6563c2d-f8ab-44d0-a90e-add204fa261c']
        },
        {
            id: '51727f17-e39a-4706-b873-c20356126237',
            manufacturerId: 'eaf8c036-5c5b-40e6-917e-5008f0d15ce1',
            price: 18000,
            firstRegistrationDate: new Date('2018-12-30T10:53:14.215Z'),
            ownerIds: ['fd5b4fea-9000-4ad9-ae07-150a6e6058ed', '721d6739-0b5c-4fa2-86bf-1b708c82eeae']
        }
    ];

    private manufacturers: Manufacturer[] = [
        {
            id: 'd3260179-910f-4f1c-b37d-4e855ed9be8e',
            name: 'Toyota',
            phone: '+33-655-5154-58',
            siret: 453983245
        },
        {
            id: 'eaf8c036-5c5b-40e6-917e-5008f0d15ce1',
            name: 'Ford',
            phone: '+33-651-5152-53',
            siret: 453983291
        }
    ];

    private owners: Owner[] = [
        {
            id: 'c6563c2d-f8ab-44d0-a90e-add204fa261c',
            name: 'John Smith',
            purchaseDate: new Date('2019-08-12T15:15:14.882Z')
        },
        {
            id: 'fd5b4fea-9000-4ad9-ae07-150a6e6058ed',
            name: 'Ben Pitt',
            purchaseDate: new Date('2017-12-10T12:15:14.882Z')
        },
        {
            id: '721d6739-0b5c-4fa2-86bf-1b708c82eeae',
            name: 'Ann Frost',
            purchaseDate: new Date('2018-12-10T12:15:14.882Z')
        },
    ];

    create(carDto: CreateCarDto) {
        const owners: Owner[] = carDto.owners.map((owner) => {
            return {
                id: uuid(),
                name: owner.name,
                purchaseDate: new Date(owner.purchaseDate)
            };
        });

        const ownerIds = owners.map((owner) => owner.id);

        this.owners = this.owners.concat(owners);

        const manufacturer: Manufacturer = {
            id: uuid(),
            name: carDto.manufacturer.name,
            phone: carDto.manufacturer.phone,
            siret: carDto.manufacturer.siret
        };

        this.manufacturers.push(manufacturer);

        const firstRegistrationDate: Date = new Date(carDto.firstRegistrationDate);

        const car: Car = {
            id: uuid(),
            manufacturerId: manufacturer.id,
            price: carDto.price,
            firstRegistrationDate: firstRegistrationDate,
            ownerIds: ownerIds,
        };

        this.cars.push(car);
    }

    findAll(): CarPopulated[] {
        return this.cars.map((car: Car) => {
            return this.populateCar(car);
        });
    }

    findById(id): CarPopulated {
        return this.populateCar(this.cars.find((car: Car) => car.id === id));
    }

    findManufacturerById(id): Manufacturer {
        const car = this.cars.find((car: Car) => car.id === id);
        const manufacturerId: string = car.manufacturerId;

        return this.manufacturers.find((manufacturer: Manufacturer) => manufacturer.id === manufacturerId);
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let car: Car = this.cars.find((car: Car) => car.id === id);

        if (!car) {
            return;
        }

        const carPopulated = this.populateCar(car);

        if (!!updateCarDto.manufacturer) {
            let manufacturer: Manufacturer = carPopulated.manufacturer;

            manufacturer.name = updateCarDto.manufacturer.name;
            manufacturer.phone = updateCarDto.manufacturer.phone;
            manufacturer.siret = updateCarDto.manufacturer.siret;
        }

        if (!!updateCarDto.price) {
            car.price = updateCarDto.price;
        }

        if (!!updateCarDto.firstRegistrationDate) {
            car.firstRegistrationDate = new Date(updateCarDto.firstRegistrationDate);
        }

        if (updateCarDto.owners) {
            for (let owner_id of car.ownerIds) {
                const index = this.owners.findIndex((owner: Owner) => owner.id === owner_id);

                this.owners.splice(index, 1);
            }

            let newOwnerIds: string[] = [];

            for (let o of updateCarDto.owners) {
                const id = uuid();

                this.owners.push({
                    id: id,
                    name: o.name,
                    purchaseDate: new Date(o.purchaseDate)
                });

                newOwnerIds.push(id);
            }

            car.ownerIds = newOwnerIds;
        }
    }

    deleteById(id: string) {
        const index = this.cars.findIndex((car: Car) => car.id === id);

        this.cars.splice(index, 1);

        return;
    }

    populateCar(car) {
        const manufacturer: Manufacturer = this.findManufacturerById(car.id);

        let ownerIdsDict = {};

        for (let owner_id of car.ownerIds) {
            ownerIdsDict[owner_id] = true;
        }

        const owners: Owner[] = this.owners.filter((owner: Owner) => ownerIdsDict[owner.id]);

        return  {
            id: car.id,
            manufacturer: manufacturer,
            price: car.price,
            firstRegistrationDate: car.firstRegistrationDate,
            owners: owners
        };
    }

    removeOwnersBeforeLast18Months() {
        let d = new Date();
        const minDate = new Date(d.setUTCMonth(d.getUTCMonth() - 18));

        let newOwners = [];

        for (let owner of this.owners) {
            if (owner.purchaseDate > minDate) {
                newOwners.push(owner);
            } else {
                const ownerId = owner.id;

                for (let car of this.cars) {
                    const index = car.ownerIds.indexOf(ownerId);

                    if (index !== -1) {
                        car.ownerIds.splice(index, 1);
                    }
                }
            }
        }

        this.owners = newOwners;
    }

    applyDiscount() {
        let d = new Date();
        const minDate = new Date(d.setUTCMonth(d.getUTCMonth() - 18));

        d = new Date();
        const maxDate = new Date(d.setUTCMonth(d.getUTCMonth() - 12));

        for (let car of this.cars) {
            if (car.firstRegistrationDate > minDate && car.firstRegistrationDate < maxDate) {
                car.price *= 0.8;
            }
        }
    }
}
