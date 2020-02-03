import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array with length > 0', async () => {
      expect( service.findAll().length > 0).toBeTruthy();
    });

    it('should return an array of cars', async () => {
      const car = service.findAll()[0];

      expect(car).toHaveProperty('id');
      expect(car).toHaveProperty('manufacturer');

      expect(car.manufacturer).toHaveProperty('id');
      expect(car.manufacturer).toHaveProperty('name');
      expect(car.manufacturer).toHaveProperty('phone');
      expect(car.manufacturer).toHaveProperty('siret');

      expect(car).toHaveProperty('price');
      expect(typeof car.price).toBe("number");

      expect(car).toHaveProperty('firstRegistrationDate');
      expect(car).toHaveProperty('owners');

      expect(car.owners.length > 0).toBeTruthy();
    });
  });

  describe('findById', () => {
    it('should return a car', async () => {
      const car = service.findById('f6850b91-2014-4b8d-a8bd-0c80c0f4040d');

      expect(car).toHaveProperty('id');
      expect(car).toHaveProperty('manufacturer');
      expect(car).toHaveProperty('price');

      expect(typeof car.price).toBe("number");

      expect(car).toHaveProperty('firstRegistrationDate');
      expect(car).toHaveProperty('owners');

      expect(car.owners.length > 0).toBeTruthy();
    });
  });

  describe('findManufacturerByCarId', () => {
    it('should return a manufacturer', async () => {
      const manufacturer = service.findManufacturerByCarId('f6850b91-2014-4b8d-a8bd-0c80c0f4040d');

      expect(manufacturer).toHaveProperty('id');
      expect(manufacturer).toHaveProperty('name');
      expect(manufacturer).toHaveProperty('phone');
      expect(manufacturer).toHaveProperty('siret');
    });
  });

  describe('create', () => {
    it('should create a car', async () => {
      service.create({
        "manufacturerId": "d3260179-910f-4f1c-b37d-4e855ed9be8e",
        "price": 31219,
        "firstRegistrationDate": "2018-05-12T10:53:14.215Z",
        "owners": [
          {
            "name": "Mannie",
            "purchaseDate": "2019-08-12T15:15:14.882Z"
          }
        ]
      });

      const cars = service.findAll();

      let is_found = false;

      for (let car of cars) {
        if (car.price === 31219) {
          is_found = true;
        }
      }

      expect(is_found).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update car with specified id', async () => {
      service.update('f6850b91-2014-4b8d-a8bd-0c80c0f4040d', {
        "price": 10012,
      });

      const cars = service.findAll();

      let is_found = false;

      for (let car of cars) {
        if (car.price === 10012) {
          is_found = true;
        }
      }

      expect(is_found).toBeTruthy();
    });
  });
});
