//api key accfb71ce5131d183c44d819c83e21f6
//html dom variables
const weatherHeader = document.querySelector("#weather-header");
const weatherDisplay = document.querySelector("#weather-display");
const weatherList = document.querySelector("#weather-list");
const weatherInput = document.querySelector("#weather-input")
const fetchButton = document.querySelector("#button");
const fivedayforecast = document.querySelector("#future-weather-list")
const inputHistory = document.querySelector("#input-history");

//array for storing previous city searches
//check local storage - getItem to see if there are previous cities in there. If they are, insert into previousCities[]
const previousCities = []
localStorage.setItem("Previous City", JSON.stringify(previousCities));
console.log(previousCities)
// previousCities.push(previousCities)

function getApi() {
  //user input
  const city = weatherInput.value;
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

      weatherDisplay.classList.remove("hidden");

      const weatherItemName = data.name + " on " + convertUnixTime(data.dt);
      const icon = data.weather[0].icon;
      const iconimg = document.createElement("img");
      iconimg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherItemDescribe = "Conditions: " + data.weather[0].main;
      const weatherItemTemp = "Current temp: " + data.main.temp + "℉";
      const weatherItemHumid = "Humidity: " + data.main.humidity + "%";
      const weatherItemWind = "Wind: " + data.wind.speed + "mph";

      //append
      const newLi = document.createElement("li");
      newLi.append(iconimg);
      const newLi1 = document.createElement("li");
      newLi1.append(weatherItemDescribe);
      const newLi2 = document.createElement("li");
      newLi2.append(weatherItemTemp);
      const newLi3 = document.createElement("li");
      newLi3.append(weatherItemHumid);
      const newLi4 = document.createElement("li");
      newLi4.append(weatherItemWind);

      weatherHeader.innerHTML = "";
      weatherHeader.append(weatherItemName);
      weatherList.innerHTML = "";
      weatherList.append(newLi, newLi1, newLi2, newLi3, newLi4);

      saveCityName(city);

      //use coordinates from this response to search for 5 day forecast, uv index
      const citylon = data.coord.lon;
      const citylat = data.coord.lat;
      const coordRequestUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        citylat +
        "&lon=" +
        citylon +
        "&units=imperial&appid=" +
        apiKey;

      return fetch(coordRequestUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector("#future").classList.remove("hidden");

      const UVILI = document.createElement("li");
      const uvidata = data.current.uvi;
      const weatherItemUVI = "UV Index: " + uvidata;
      UVILI.append(weatherItemUVI);
      weatherList.appendChild(UVILI);

      //clearing out before loop runs
      fivedayforecast.innerHTML="";
      for (let i = 1; i <= 5; i++) {
        //variables
        const futureicon = data.daily[i].weather[0].icon;
        const iconimg1 = document.createElement("img");
        iconimg1.src =
          "http://openweathermap.org/img/wn/" + futureicon + "@2x.png";
        const futureDates = convertUnixTime(data.daily[i].dt);
        const futureConditions = "Conditions: " + data.daily[i].weather[0].main;
        const futureTemp = "Temp: " + data.daily[i].temp.day + "℉";
        const futureHumidity = "Humidity: " + data.daily[i].humidity + "%";
        const futureWind = "Wind: " + data.daily[i].wind_speed + "mph";
        const uvidata1 = data.daily[i].uvi;
        const futureUVI = "UV Index: " + uvidata1;

        const futureWeatherList = [
          futureDates,
          iconimg1,
          futureConditions,
          futureTemp,
          futureHumidity,
          futureWind,
        ];

        const futureLi = document.createElement("li");
        futureLi.append(futureWeatherList[0]);
        const futureLi1 = document.createElement("li");
        futureLi1.append(futureWeatherList[1]);
        const futureLi2 = document.createElement("li");
        futureLi2.append(futureWeatherList[2]);
        const futureLi3 = document.createElement("li");
        futureLi3.append(futureWeatherList[3]);
        const futureLi4 = document.createElement("li");
        futureLi4.append(futureWeatherList[4]);
        const futureLi5 = document.createElement("li");
        futureLi5.append(futureWeatherList[5]);
        const lb = document.createElement("br");

       fivedayforecast.append(lb, lb, futureLi, futureLi1, futureLi3, futureLi4, futureLi5);

        const futureUVLI = document.createElement("li");
        futureUVLI.append(futureUVI);
        fivedayforecast.appendChild(futureUVLI);

        //change uvi colors
        //https://www.epa.gov/sites/default/files/documents/uviguide.pdf
        if (uvidata1 <= 2) {
          futureUVLI.classList.add("minimal");
        } else if (uvidata1 <= 4) {
          futureUVLI.classList.add("low");
        } else if (uvidata1 <= 6) {
          futureUVLI.classList.add("moderate");
        } else if (uvidata1 <= 9) {
          futureUVLI.classList.add("high");
        } else {
          futureUVLI.classList.add("extreme");
        }
      }

      if (uvidata <= 2) {
        UVILI.classList.add("minimal");
      } else if (uvidata <= 4) {
        UVILI.classList.add("low");
      } else if (uvidata <= 6) {
        UVILI.classList.add("moderate");
      } else if (uvidata <= 9) {
        UVILI.classList.add("high");
      } else {
        UVILI.classList.add("extreme");
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
//save search history
function saveCityName(cityName) {
  previousCities.push(cityName)
  localStorage.setItem("Previous City", JSON.stringify(previousCities));
 displayPreviousCities();
}

function displayPreviousCities(){
  inputHistory.innerHTML = ""
  for (const cityName of previousCities){
    console.log(cityName);
    //create button, set button text to be city name, append button 
    citybutton = document.createElement("button");
    citybutton.innerHTML = cityName;
    inputHistory.append(citybutton);
    //running function with current value, not previous value 
    citybutton.addEventListener("click",getApi)
  }
}

fetchButton.addEventListener("click", getApi);

