let cars = {}

module.exports = {
    addCar (car)  {
        cars[car.car_name] = car
    },
    removeCar() {},
    report ()  {},
    setAttrCar ()  {}
}