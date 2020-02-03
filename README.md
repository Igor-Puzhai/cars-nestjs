# Cars API

## Description
Cars API with dummy data in server memory

## Running in Docker
docker-compose up --build -d

The API is running on http://localhost:4000/

## API endpoints
documentation is available at /swagger

GET /cars
get all cars

GET /cars/:id
get one car by id

GET /cars/:id/manufacturer
get the car manufacturer info by car id

POST /cars
create new car, see swagger for details

PUT /cars/:id
update car by id, all fields optional, see swagger for details

DELETE /cars/:id
delete car by id

POST /cars/remove-old-owners-apply-discount
trigger to apply discounts and remove owners 

## Concerns
there is no manufacturers API, to add a car you need to use an existing manufacturerId 

## Questions
spec says siret is a number, but internet says it may contain letters