const randomizer = require('./randomizer')

let cars = []
let attribute_changes = {}

function startTravel(car) {
    car.status = 'traveling'
    /*
        There are three car types: ‘private’, ‘minibus’ and ‘bus’. Each of them has a 
        different number of seats – 4, 10 and 40, accordingly. Pay attention that 
        allowed_num_passengers can never be greater than the number of seats. 
        The allowed number of passengers for each car is initialized to the maximum 
        (number of seats in this car); the cost per KM is initialized to $1.5 in the private car and to $0.8 
        in the larger vehicles; maximal speed is set to 100Kmph for all vehicles.

        Once started running, each car simulates a random travel. This is done in the following way:
        ·​ ​Traveling:
        ·​ ​Randomly choose number of passengers (must be in the allowed range).
        ·​ ​Randomly choose traveling distance (1...50KM)
        ·​ ​Randomly choose average speed (0.5*allowed_max_speed...1*allowed_max_speed)
        ·​ ​After ‘finishing’ the travel, randomly choose waiting time (5...60mins)
        ·​ ​Repeat the above procedure continuously.
        ·​ ​Any change in a car’s attributes will only take effect in its next travel.
        ·​ ​Removing a car will take effect when it finishes its current travel (and without the last stage of waiting).
    */
    switch(car.type) {
        case "private":
            car.number_of_seats = 4
            car.cost_per_km = 1.5
            break;
        case 'minibus':
            car.number_of_seats = 10
            car.cost_per_km = 0.8
            break;
        case 'bus':
            car.number_of_seats = 40
            car.cost_per_km = 0.8
            break;
    }

    car.max_speed_in_km = 100
    car.number_of_passengers = randomizer.getRandomInt(1, car.number_of_seats)
    car.traveling_distance_in_km = randomizer.getRandomInt(1,50)
    car.average_speed = randomizer.getRandomFloat(0.5,1) * car.max_speed_in_km
    car.status = "traveling"

    setTimeout(function() {
        stopTravel(car)
    }, 4000)
}

function updateCarAttributes(car) {

}

function stopTravel(car) {
    if (car.status == 'to_remove'){

        return
    }

    let idle_time = randomizer.getRandomInt(5,60)
    setTimeout(function() {
        // Update attributes on car only when the next travel will begin.
        updateCarAttributes(car)

        // Start travel again
        startTravel(car)
    }, idle_time * 1000 * 60)

}

module.exports = {
    addCar (car)  {
        car.travel=0

        cars.push(car)
        startTravel(car)
    },
    removeCar() {},
    report ()  {

    },
    getAll ()  {
        return cars
    },
    setAttrCar ()  {}
}