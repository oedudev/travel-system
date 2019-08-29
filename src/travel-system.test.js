let travel_system = require('../src/travel-system')

test('Add Car - 1', () => {
    reportCars = travel_system.getAll()
    
    // Check array is empty when we start
    expect(reportCars.length).toBe(0)

    // Let`s add a car and check if the report works
    testCar = {
        type: 'private',
        name: 'first_car'
    }
    travel_system.addCar(testCar)

    // Getting all cars again...
    reportCars = travel_system.getAll()

    // Check if we have one item on the collection
    expect(reportCars.length).toBe(1)
    
    // Check if the new object is equal to object passed
    let existingCar = reportCars[0] 
    expect(existingCar).toEqual(testCar);
  });