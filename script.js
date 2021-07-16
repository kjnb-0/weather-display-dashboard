
//https://openweathermap.org/api/one-call-api

//var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

// Parameters
// lat, lon	required	Geographical coordinates (latitude, longitude)
// dt	required	Date from the previous five days (Unix time, UTC time zone), e.g. dt=1586468027
// appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)
// units	optional	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default.
// lang	optional	You can use the lang parameter to get the output in your language.


// Browser Fetch Method
// TODO: Comment on how Fetch returns an API call
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });