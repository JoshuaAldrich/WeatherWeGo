// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

let cities;
let searchButton = document.getElementById("search-city");
let searchBar = document.querySelector("#search-bar");
let clearHistory = document.querySelector("#clearHistory");
let currentResult = document.querySelector(".currentResult");
let currentTemperature = document.querySelector(".temp");
let currentHumidty = document.querySelector(".humidity");
let currentWindSpeed = document.querySelector(".windSpeed");
let currentUVIndex = document.querySelector(".uvIndex");
let pastSearch = document.querySelector(".recentSearch");
const apiKey = "bb92cbec3b50947b23fb22f9708980b8";

//Get coordinates for chosen city
let conversion = async function (city) {
  let coordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  let response = await fetch(coordinates);
  let data = await response.json();
  console.log(data);
  return data;
};
conversion("Orlando");

//API call to Openweather
let getWeather = async function (city) {
  try {
    let latLon = await conversion(city);

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon[0].lat}&lon=${latLon[0].lon}&appid=${apiKey}`;
    let cityInformation = await fetch(apiUrl);
    let cityWeather = await cityInformation.json();
    let apiUrl5Day = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0].lat}&lon=${latLon[0].lon}&appid=${apiKey}`;
    let cityInformation5Day = await fetch(apiUrl5Day);
    let cityWeather5Day = await cityInformation5Day.json();
    displayWeather(cityWeather);
    displayWeather(cityWeather5Day);
  } catch (error) {
    alert("Connection to OpenWeather API not working.");
  }
};

function displayWeather(data) {
  console.log(data);
}

searchButton.addEventListener("click", function () {
  getWeather(searchBar.value);
});
