import {Manufacturer} from './manufacturer.interface';
import {Owner} from './owner.interface';

export interface Car {
    id: string;
    manufacturerId: string;
    price: number;
    firstRegistrationDate: Date;
    ownerIds: string[];
}

export interface CarPopulated {
    id: string;
    manufacturer: Manufacturer;
    price: number;
    firstRegistrationDate: Date;
    owners: Owner[];
}
