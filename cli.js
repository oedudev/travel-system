const axios = require('axios')
var readline = require('readline');

function sendCommand(command) {
    const payload = {
        "command": command
    }
    return axios.post("http://localhost:3000/action", payload)
        .then(res => {
            return res.data
        })
}

function main() {
    var reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    reader.question("Type below your command:\n", function (command) {
        reader.close();

        sendCommand(command).then(res => {
            console.log(`RESPONSE => ${res.msg}`)
        }).catch(err => {

            if (!err.response) {
                console.log(`RESPONSE => Cannot find the server (Do you run 'npm run start-server?')`)
                return
            }

            console.log(`RESPONSE => ${err.response.data.errorMessage}`)
            return
        }).finally(() => {
            console.log('\n')
            main()
        })

    });
}

main()


