const moment = require('moment')
const randomizer = require('./randomizer')

let cars = []
let attribute_changes = {}

function getTimeDiff(time_1, time_2) {
    var duration = moment.duration(time_1.diff(time_2))
    return duration
}

function startTravel(car) {
    console.log(`Starting travel for car '${car.name}'`)

    setDefaultCarAttributes(car)

    // Update attributes on car only when the next travel will begin.
    updateCarAttributes(car)

    setTimeout(function () {
        stopTravel(car)
    }, 10000)
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
        start_travel_date: new moment()
    })
}

function updateCarAttributes(car) {
    let attributes_for_car = attribute_changes[car.name]

    if (attributes_for_car) {
        for (attribute_name in attributes_for_car) {
            const attribute_value = attributes_for_car[attribute_name]
            car[attribute_name] = attribute_value
            console.log(`Setting attribute '${attribute_name}' with value '${attribute_value}' on car '${car.name}'`)
        }
        console.log(`Custom attributes setted for car '${car.name}'`)
        delete attribute_changes[car.name]
    }
}

function stopTravel(car) {
    console.log(`Stopping travel for car '${car.name}'`)

    let idle_time_in_minutes = randomizer.getRandomInt(5, 60)
    let idle_time_in_milliseconds = idle_time_in_minutes * 60 * 1000
    idle_time_in_milliseconds = 3000

    let current_travel = car.travels[car.travels.length - 1]
    current_travel.waiting_time = idle_time_in_minutes
    current_travel.income = (car.number_of_passengers * car.traveling_distance_in_km * car.cost_per_km)
    current_travel.finish_travel_date = new moment()

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
    let selected_cars = cars.filter(function (car) {
        return car.name == car_name
    })

    if (selected_cars.length == 0) {
        throw Error(`Not found car with name '${car_name}'`)
    }

    return selected_cars[0]
}

function formatPercentage(value) {
    return parseFloat(value * 100).toFixed(2) + "%"
}

module.exports = {
    addCar(car) {
        car = initializeCar(car)
        startTravel(car)
    },
    removeCar(car_name) {
        let selected_car = getCarByName(car_name)
        selected_car.status = 'to_remove'
        console.log(`Car '${car_name}' was marked to be removed`)
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
        let total_waiting_time = 0
        travels.forEach(travel => {
            total_income += travel.income
            total_waiting_time += travel.waiting_time
        });

        let duration = getTimeDiff(new moment(), travels[0].start_travel_date)
        let report = {
            time_from_start: duration.as('milliseconds'),
            number_of_travels: travels.length,
            total_income: total_income,
            percent_waiting_time: formatPercentage(total_waiting_time / duration.as('minutes'))
        }

        if (selected_car.type == 'minibus' || selected_car.type == 'bus') {
            report.average_capacity = selected_car.number_of_seats / selected_car.number_of_passengers
        }

        return report
    },
    setAttrCar(request) {
        const { car_name, attribute_name, attribute_value } = request

        if (!attribute_changes[car_name]) {
            attribute_changes[car_name] = {}
        }

        attribute_changes[car_name][attribute_name] = attribute_value

        console.log(`Storing attribute '${attribute_name}' with value '${attribute_value}' for car '${car_name}'`)
    }
}