//https://openweathermap.org/api/one-call-api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//api key accfb71ce5131d183c44d819c83e21f6

var weatherHeader = document.querySelector("#weather-header");
var weatherList = document.querySelector("#weather-list");
var UVI = document.querySelector("#uv-index");
var fetchButton = document.querySelector("#button");

function getApi() {
  //user input
  var city = $("#weather-input").val();
  var apiKey = "accfb71ce5131d183c44d819c83e21f6";
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //name and date
      var weatherItemDate = convertUnixTime(data.dt);
      var weatherItemName = document.createElement("h4");
      weatherItemName.textContent = data.name + " on " + weatherItemDate;
      weatherHeader.append(weatherItemName);

      //icon for weather conditions
      var icon = data.weather[0].icon;
      var iconimg = document.createElement("img");
      iconimg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      weatherList.append(iconimg);

      //description
      var weatherItemDescribe = document.createElement("li");
      weatherItemDescribe.textContent = "Conditions: " + data.weather[0].main;
      weatherList.append(weatherItemDescribe);
      //current temp
      var weatherItemTemp = document.createElement("li");
      weatherItemTemp.textContent = "Current temp: " + data.main.temp + "℉";
      weatherList.append(weatherItemTemp);
      //humidity
      var weatherItemHumid = document.createElement("li");
      weatherItemHumid.textContent = "Humidity: " + data.main.humidity + "%";
      weatherList.append(weatherItemHumid);
      //wind
      var weatherItemWind = document.createElement("li");
      weatherItemWind.textContent = "Wind: " + data.wind.speed + "mph";
      weatherList.append(weatherItemWind);

      //use coordinates from this response to search for 5 day forecast, uv index?
      var citylon = data.coord.lon;
      var citylat = data.coord.lat;
      console.log(citylon, citylat);
      var coordRequestUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        citylat +
        "&lon=" +
        citylon +
        "&appid=" +
        apiKey;

      return fetch(coordRequestUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherItemUVI = document.createElement("li");
      var uvidata = data.current.uvi;
      weatherItemUVI.textContent = "UV Index: " + uvidata;
      UVI.append(weatherItemUVI);

      console.log(weatherItemUVI);
      console.log(uvidata);
//change uvi colors
//https://www.epa.gov/sites/default/files/documents/uviguide.pdf
      if (uvidata <= 2) {
        weatherItemUVI.classList.add("minimal");
      } else if (uvidata <= 4) {
        weatherItemUVI.classList.add("low");
      } else if (uvidata <= 6) {
        weatherItemUVI.classList.add("moderate");
      } else if (uvidata <= 9) {
        weatherItemUVI.classList.add("high");
      } else {
        weatherItemUVI.classList.add("extreme");
      }
    });

  //option to view future weather conditions - take to separate html page or just display on side/bottom?
}

//to convert unix time to standard time
function convertUnixTime(unix) {
  let a = new Date(unix * 1000),
    year = a.getFullYear(),
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    month = months[a.getMonth()],
    date = a.getDate(),
    hour = a.getHours();
  return `${month} ${date}, ${year}`;
}

fetchButton.addEventListener("click", getApi);
