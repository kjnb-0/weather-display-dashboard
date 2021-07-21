//https://openweathermap.org/api/one-call-api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//api key accfb71ce5131d183c44d819c83e21f6

var weatherList = document.querySelector("#weather-list");
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

      //date
      var weatherItemDate = document.createElement("li");
      weatherItemDate.textContent = convertUnixTime(data.dt);
      console.log(convertUnixTime(data.dt));
      weatherList.appendChild(weatherItemDate);
      //name
      var weatherItemName = document.createElement("li");
      weatherItemName.textContent = "City: " + data.name;
      weatherList.appendChild(weatherItemName);
      //description
      var weatherItemDescribe = document.createElement("li");
      weatherItemDescribe.textContent = "Weather: " + data.weather[0].main;
      weatherList.appendChild(weatherItemDescribe);
      //current temp
      var weatherItemTemp = document.createElement("li");
      weatherItemTemp.textContent = "Current temp: " + data.main.temp + "℉";
      weatherList.appendChild(weatherItemTemp);
      //humidity
      var weatherItemHumid = document.createElement("li");
      weatherItemHumid.textContent = "Humidity: " + data.main.humidity + "%";
      weatherList.appendChild(weatherItemHumid);
      //wind
      var weatherItemWind = document.createElement("li");
      weatherItemWind.textContent = "Wind: " + data.wind.speed + "mph";
      weatherList.appendChild(weatherItemWind);
      //icon for weather conditions
      var icon = data.weather[0].icon;
      var iconimg = document.createElement("img");
      iconimg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      weatherList.appendChild(iconimg);

      //use coordinates from this response to search for 5 day forecast, uv index?
      //option to view future weather conditions - take to separate html page

      //uv index
      // var weatherItemUV = document.createElement("li");
      // weatherItemUV.textContent = data.current.uvi;
      // weatherList.appendChild(weatherItemUV);
    });
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
    hour = a.getHours(),
    min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
  return `${month} ${date}, ${year}, ${hour}:${min}`;
}

fetchButton.addEventListener("click", getApi);
