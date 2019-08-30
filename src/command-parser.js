/*
·       newcar <car_type> <car_name>: Create and start running a new car, named <car_name>.
·       remove <car_name>: Stop and remove the car <car_name> from the system.
·       report <car_name>: Get a report from <car_name>.
·       set <car_name> <attr> <val>: Set attribute <attr> of <car_name> to <val>
*/

module.exports = {
    parse: (msg) => {
        let parseResult = {
            isValid: false,
            errorMessage: "",
            action: "",
            payload: null
        }

        let splittedMsg = msg.split(" ")
        let action = splittedMsg[0]
        parseResult.action = action

        switch (action) {
            case "newcar":
                if (splittedMsg.length != 3) {
                    parseResult.isValid = false
                    parseResult.errorMessage = "invalid argument numbers"
                    return parseResult
                }

                let car_type = splittedMsg[1].toLowerCase()
                if (car_type != "private" && car_type != "bus" && car_type != "minibus") {
                    parseResult.isValid = false
                    parseResult.errorMessage = "car_type is invalid"
                    return parseResult
                }

                parseResult.isValid = true
                parseResult.payload = {
                    type: splittedMsg[1],
                    name: splittedMsg[2]
                }

                return parseResult
            case "remove":
                if (splittedMsg.length != 2) {
                    parseResult.isValid = false
                    parseResult.errorMessage = "invalid argument numbers"
                    return parseResult
                }

                parseResult.isValid = true
                parseResult.payload = {
                    car_name: splittedMsg[1]
                }
                return parseResult
            case "report":
                if (splittedMsg.length != 2) {
                    parseResult.isValid = false
                    parseResult.errorMessage = "invalid number of arguments"
                    return parseResult
                }

                parseResult.isValid = true
                parseResult.payload = {
                    car_name: splittedMsg[1]
                }
                return parseResult
            case "set":
                if (splittedMsg.length != 4) {
                    parseResult.isValid = false
                    parseResult.errorMessage = "invalid number of arguments"
                    return parseResult
                }


                const car_name = splittedMsg[1]
                const attribute_name = splittedMsg[2]
                const attribute_value = splittedMsg[3]

                if (attribute_name != "cost_per_km" && attribute_name != "allowed_num_passengers" && attribute_name != "allowed_max_speed") {
                    parseResult.isValid = false
                    parseResult.errorMessage = `Invalid attribute name: '${attribute_name}'`
                    return parseResult
                }

                parseResult.isValid = true
                parseResult.payload = {
                    car_name: car_name,
                    attribute_name: attribute_name,
                    attribute_value: attribute_value
                }

                return parseResult
            default:
                parseResult.isValid = false
                parseResult.errorMessage = "invalid action"
                return parseResult
        }

        return parseResult
    }
}