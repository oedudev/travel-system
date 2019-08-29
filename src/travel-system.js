const random = require('random')

let cars = []

module.exports = {
    addCar (car)  {
        car.status = 'pending'
        car.cost_per_km = 
        car.allowed_num_passengers
        car.allowed_max_speed
        cars.push(car)
    },
    removeCar() {},
    report ()  {

    },
    getAll ()  {
        return cars
    },
    setAttrCar ()  {}
}