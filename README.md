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
trigger to apply discount and remove owners 

## Concerns
- there is no manufacturers API, to add a car you need to use an existing manufacturerId
- trigger for applying discount and removing old owners - should this be split into separate triggers/routes? if it's a single trigger, naming it clearly is a challenge.

## Questions
spec says siret is a number, but wikpedia says it may contain letters https://en.wikipedia.org/wiki/SIRET_code

## Tests
added basic tests coverage of cars service