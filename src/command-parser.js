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
                console.log("cheguei no create")
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
                    car_type: splittedMsg[1],
                    car_name: splittedMsg[2]
                }

                return parseResult
            case "remove":
                break;
            case "report":
                break;
            case "set":
                break; 
            default:
                return parseResult                                       
        }

        return parseResult
    }
}