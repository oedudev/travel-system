const randomizer = require('./randomizer')

let cars = []
let attribute_changes = {}


function startTravel(car) {

    setDefaultCarAttributes(car)

    // Update attributes on car only when the next travel will begin.
    updateCarAttributes(car)

    setTimeout(function () {
        stopTravel(car)
    }, 4000)
}

function initializeCar(car) {
    car.travels = []
    cars.push(car)
    return car
}

function setDefaultCarAttributes(car) {
    // Setting generic attributes
    car.max_speed_in_km = 100
    car.status = "traveling"

    // Setting specific attributes
    switch (car.type) {
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

    // Setting specific random attributes
    car.number_of_passengers = randomizer.getRandomInt(1, car.number_of_seats)
    car.traveling_distance_in_km = randomizer.getRandomInt(1, 50)
    car.average_speed = randomizer.getRandomFloat(0.5, 1) * car.max_speed_in_km
    car.travels.push({
        start_travel_date: new Date()
    })
}

function updateCarAttributes(car) {
    let changes_for_car = attribute_changes[car.name]

    if (changes_for_car) {
        delete attribute_changes[car.name]
    }
}

function stopTravel(car) {
    let idle_time_in_minutes = randomizer.getRandomInt(5, 60)
    let idle_time_in_milliseconds = idle_time_in_minutes * 60 * 1000
    idle_time_in_milliseconds = 3000

    let current_travel = car.travels[car.travels.length - 1]
    current_travel.waiting_time = idle_time_in_minutes
    current_travel.income = (car.number_of_passengers * car.traveling_distance_in_km * car.cost_per_km)
    current_travel.finish_travel_date = new Date()

    setTimeout(function () {

        if (car.status == 'to_remove') {
            console.log('Car was removed, stopping processing...')
            return
        }
        // Start travel again
        startTravel(car)
    }, idle_time_in_milliseconds)
}

function getCarByName(car_name) {
    let selected_car = cars.filter(function (car) {
        return car.name == car_name
    })[0]
    return selected_car
    // return cars[0]
}

module.exports = {
    addCar(car) {
        car = initializeCar(car)
        startTravel(car)
    },
    removeCar(car_name) {
        let selected_car = getCarByName(car_name)
        selected_car.status = 'to_remove'
    },
    report(car_name) {
        let selected_car = getCarByName(car_name)

        let travels = selected_car.travels.filter(function (travel) {
            return travel.finish_travel_date
        })

        if (travels.length == 0) {
            return {}
        }

        let total_income = 0;
        travels.forEach(travel => {
            total_income += travel.income
        });

        return {
            time_from_start: travels[0].start_travel_date,
            number_of_travels: travels.length,
            total_income: total_income,
            // travels: travels
        }
    },
    setAttrCar(car_attributes) {

    }
}