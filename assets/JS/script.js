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
let button = document.querySelector("button");
let inputValue = document.querySelector(".inputValue");
let name = document.querySelector(".name");
let description = document.querySelector(".description");
let temp = document.querySelector(".temp");
const apiKey = "bb92cbec3b50947b23fb22f9708980b8";

let previousSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

//Fetch API
let currentCity = function (city) {
  let apiSearch =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

  fetch(apiSearch).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        getWeather(data, city);
      });
    } else {
      alert("error");
    }
  });
};

