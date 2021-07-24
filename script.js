//https://openweathermap.org/api/one-call-api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//api key accfb71ce5131d183c44d819c83e21f6
const weatherHeader = document.querySelector("#weather-header");
const weatherList = document.querySelector("#weather-list");
const futureWeatherList = document.querySelector("#future-weather");
const UVI = document.querySelector("#uv-index");
const fetchButton = document.querySelector("#button");

function getApi() {
  //user input
  const city = $("#weather-input").val();
  const apiKey = "accfb71ce5131d183c44d819c83e21f6";
  const requestUrl =
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
      const weatherItemName = document.createElement("h4");
      weatherItemName.textContent =
        data.name + " on " + convertUnixTime(data.dt);
      //icon for weather conditions
      const icon = data.weather[0].icon;
      const iconimg = document.createElement("img");
      iconimg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //description
      const weatherItemDescribe = document.createElement("li");
      weatherItemDescribe.textContent = "Conditions: " + data.weather[0].main;
      //current temp
      const weatherItemTemp = document.createElement("li");
      weatherItemTemp.textContent = "Current temp: " + data.main.temp + "℉";
      //humidity
      const weatherItemHumid = document.createElement("li");
      weatherItemHumid.textContent = "Humidity: " + data.main.humidity + "%";
      //wind
      const weatherItemWind = document.createElement("li");
      weatherItemWind.textContent = "Wind: " + data.wind.speed + "mph";
      //append
      weatherHeader.append(weatherItemName);
      weatherList.append(
        iconimg,
        weatherItemDescribe,
        weatherItemTemp,
        weatherItemHumid,
        weatherItemWind
      );

      //use coordinates from this response to search for 5 day forecast, uv index
      const citylon = data.coord.lon;
      const citylat = data.coord.lat;
      console.log(citylon, citylat);
      const coordRequestUrl =
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

      const weatherItemUVI = document.createElement("li");
      const uvidata = data.current.uvi;
      weatherItemUVI.textContent = "UV Index: " + uvidata;
      UVI.append(weatherItemUVI);

      //i loop for cards?
      for (let i = 1; i <= 5; i++) {
        //variables
        const futureicon = data.daily[i].weather[0].icon;
        const iconimg1 = document.createElement("img");
        iconimg1.src =
          "http://openweathermap.org/img/wn/" + futureicon + "@2x.png";
        const newDiv = document.createElement("div");
        const futureDates = convertUnixTime(data.daily[i].dt);
        const futureConditions = "Conditions: " + data.daily[i].weather[0].main;
        const futureTemp = "Temp: " + data.daily[i].temp.day;
        const futureHumidity = "Humidity: " + data.daily[i].humidity + "%";
        const futureWind = "Wind: " + data.daily[i].wind_speed + "mph"; 
        const futureUVI = "UV Index: " + data.daily[i].uvi;

        newDiv.append(futureDates,
          iconimg1,
          futureConditions,
          futureTemp,
          futureHumidity,
          futureWind,
          futureUVI);

        // add the newly created element and its content into the DOM - from MDN docs
        const currentDiv = document.getElementById("div1");
        document.body.insertBefore(newDiv, currentDiv);
      }
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
}

//to convert unix time to standard time - https://www.codeinwp.com/snippets/convert-unix-time-to-date-with-javascript/
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
