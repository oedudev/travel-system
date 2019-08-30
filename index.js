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
    return res.status(500).json({
      errorMessage: parseResult.errorMessage
    })
  }

  switch (parseResult.action) {
    case "newcar":
      travelSystem.addCar(parseResult.payload)
      return res.status(200).json({ msg: "Car added" })
    case "report":
      const report = travelSystem.report(parseResult.payload.car_name)
      return res.status(200).json(report)
    case "remove":
      travelSystem.removeCar(parseResult.payload.car_name)
      return res.status(200).json({ msg: "Car removed" })
    case "set":
      travelSystem.setAttrCar(parseResult.payload)
      return res.status(200).json({ msg: "Attribute setted" })
  }

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});