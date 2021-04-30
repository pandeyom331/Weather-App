const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
//Using ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", function(req, res) {
        res.render("list");
});

app.post("/result", function(req, res) {

  const query = req.body.cityName;
  const ApiKey = "0b0f45c06c9877095c72d0874d05cd70";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + ApiKey + "&units=" + unit + "";

  https.get(url, function(response) {
    // console.log(response.statusCode);

    response.on("data", function(data) {
      // console.log((data));
      const WeatherData = JSON.parse(data);

      var temperature = WeatherData.main.temp;
      var feels_like = WeatherData.main.feels_like;
      var temperature_min = WeatherData.main.temp_min;
      var temperature_max = WeatherData.main.temp_max;
      var pressure = WeatherData.main.pressure;
      var humidity = WeatherData.main.humidity;
      var WeatherDiscription = WeatherData.weather[0].description;
      var Icon = WeatherData.weather[0].icon;
      var imageURL = "http://openweathermap.org/img/wn/" + Icon + "@2x.png";

      res.render("result", {temp : temperature, cityName: query, aboutWeather : WeatherDiscription, image : imageURL, feels_like :feels_like, temperature_min:temperature_min, temperature_max:temperature_max, pressure:pressure, humidity:humidity});

    });
  });
});

app.post("/", function(req, res) {
        res.render("list");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started sucessfully.");
});
