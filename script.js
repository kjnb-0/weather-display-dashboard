//https://openweathermap.org/api/one-call-api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//api key accfb71ce5131d183c44d819c83e21f6

var weatherList = document.querySelector("#weather-list");
var fetchButton = document.querySelector("#button");

 // read userinput from textinput in html 
  // fetch w/ userinput 

function getApi() {
  //placeholder values in requesturl - need to change to user input
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=47&lon=-122&exclude=hourly,minutely&appid=accfb71ce5131d183c44d819c83e21f6";
  console.log(requestUrl);
  //activity #4
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("fetch response");
      console.log(data);
      //create blank list element

      //name - timezone for now, change to userinput? how work with coordinates?
      var weatherItemName = document.createElement("li");
      weatherItemName.textContent = data.timezone;
      weatherList.appendChild(weatherItemName);
      //date
      var weatherItemDate = document.createElement("li");
      weatherItemDate.textContent = data.current.dt;
      weatherList.appendChild(weatherItemDate);
      //icon for weather conditions - broken for now
      var weatherItemIcon = document.createElement("li");
      weatherItemIcon.textContent = data.current.weather.icon;
      weatherList.appendChild(weatherItemIcon);
      //current temp
      var weatherItemTemp = document.createElement("li");
      weatherItemTemp.textContent = data.current.temp;
      weatherList.appendChild(weatherItemTemp);
      //humidity
      var weatherItemHumid = document.createElement("li");
      weatherItemHumid.textContent = data.current.humidity;
      weatherList.appendChild(weatherItemHumid);
      //wind
      var weatherItemWind = document.createElement("li");
      weatherItemWind.textContent = data.current.wind_speed;
      weatherList.appendChild(weatherItemWind);
      //uv index
      var weatherItemUV = document.createElement("li");
      weatherItemUV.textContent = data.current.uvi;
      weatherList.appendChild(weatherItemUV);
    });
}

fetchButton.addEventListener("click", getApi);
