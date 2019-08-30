let express = require('express')
let bodyParser = require('body-parser')
let commandParser = require('./src/command-parser')
let travelSystem = require('./src/travel-system')
let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/action', function (req, res) {
  let parseResult = commandParser.parse(req.body.command)

  if (!parseResult.isValid) {
    res.status(500).json({
      errorMessage: parseResult.errorMessage
    })
    return
  }

  switch (parseResult.action) {
    case "newcar":
      travelSystem.addCar(parseResult.payload)
      res.json(parseResult);
      return
    case "report":
      const report = travelSystem.report(parseResult.payload.car_name)
      res.status(200).json(report)
  }

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});