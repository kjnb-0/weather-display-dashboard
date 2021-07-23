//https://openweathermap.org/api/one-call-api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//api key accfb71ce5131d183c44d819c83e21f6

var weatherHeader = document.querySelector("#weather-header");
var weatherList = document.querySelector("#weather-list");
var futureWeatherList = document.querySelector("#future-weather");
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

      //use coordinates from this response to search for 5 day forecast, uv index
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
      document
        .querySelector("#future-weather-cards")
        .classList.remove("hidden");

      var weatherItemUVI = document.createElement("li");
      var uvidata = data.current.uvi;
      weatherItemUVI.textContent = "UV Index: " + uvidata;
      UVI.append(weatherItemUVI);

      //card future 1
      //date
      var futureWeatherDate1 = document.createElement("li");
      futureWeatherDate1.textContent = convertUnixTime(data.daily[1].dt);
      document
        .querySelector("#future-weather-list1")
        .append(futureWeatherDate1);
      //icon
      var futureicon1 = data.daily[1].weather[0].icon;
      var iconimg1 = document.createElement("img");
      iconimg1.src =
        "http://openweathermap.org/img/wn/" + futureicon1 + "@2x.png";
      document.querySelector("#future-weather-list1").append(iconimg1);
      //card future 2
      //date
      var futureWeatherDate2 = document.createElement("li");
      futureWeatherDate2.textContent = convertUnixTime(data.daily[2].dt);
      document
        .querySelector("#future-weather-list2")
        .append(futureWeatherDate2);
      //icon
      var futureicon2 = data.daily[2].weather[0].icon;
      var iconimg2 = document.createElement("img");
      iconimg2.src =
        "http://openweathermap.org/img/wn/" + futureicon2 + "@2x.png";
      document.querySelector("#future-weather-list2").append(iconimg2);
      //card future 3
      //date
      var futureWeatherDate3 = document.createElement("li");
      futureWeatherDate3.textContent = convertUnixTime(data.daily[3].dt);
      document
        .querySelector("#future-weather-list3")
        .append(futureWeatherDate3);
      //icon
      var futureicon3 = data.daily[3].weather[0].icon;
      var iconimg3 = document.createElement("img");
      iconimg3.src =
        "http://openweathermap.org/img/wn/" + futureicon3 + "@2x.png";
      document.querySelector("#future-weather-list3").append(iconimg3);
      //card future 4
      //date
      var futureWeatherDate4 = document.createElement("li");
      futureWeatherDate4.textContent = convertUnixTime(data.daily[4].dt);
      document
        .querySelector("#future-weather-list4")
        .append(futureWeatherDate4);
      //icon
      var futureicon4 = data.daily[4].weather[0].icon;
      var iconimg4 = document.createElement("img");
      iconimg4.src =
        "http://openweathermap.org/img/wn/" + futureicon4 + "@2x.png";
      document.querySelector("#future-weather-list4").append(iconimg4);
      //card future 5
      //date
      var futureWeatherDate5 = document.createElement("li");
      futureWeatherDate5.textContent = convertUnixTime(data.daily[5].dt);
      document
        .querySelector("#future-weather-list5")
        .append(futureWeatherDate5);
      //icon
      var futureicon5 = data.daily[5].weather[0].icon;
      var iconimg5 = document.createElement("img");
      iconimg5.src =
        "http://openweathermap.org/img/wn/" + futureicon5 + "@2x.png";
      document.querySelector("#future-weather-list5").append(iconimg5);

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
