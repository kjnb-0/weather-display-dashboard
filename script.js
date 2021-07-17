
//https://openweathermap.org/api/one-call-api

// USES CITY NAME! https://openweathermap.org/current

// var requestURl api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// Parameters
// appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)


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

  // read userinput from textinput in html 
  // fetch w/ userinput
  // return data
  //push that data into .cardtext p 