const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const jade = require("jade");

const port = process.env.port || 8000;

app.use("/", express.static(__dirname + "/public"));

app.set("view engine", "jade");

app.get("/", function(req, res, next) {
  res.render("index.jade");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async function(req, response) {
  var sourceName = req.body.source;
  var destName = req.body.destination;

  await axios
    .get(
      `http://www.mapquestapi.com/directions/v2/route?key=XyaTfOnGJEvxGmkVVjqVLzsC0wQhSTlW&from=${sourceName}&to=${destName}
            `
    )
    .then(res => {
      var distance = res.data.route.distance;
      var realTime = Math.round(res.data.route.realTime / 3600);
      response.render("index", {
        sourceName: sourceName,
        destName: destName,
        distance: `Your destination is ${distance} miles away`,
        realTime: `It will take ${realTime} hrs to reach there`
      });
    });
});
// .catch(err => console.log(err));
// .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
