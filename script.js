function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  console.log(response.data);

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  // Calculate local time
  let timestamp = response.data.dt * 1000;
  let timezoneOffset = response.data.timezone * 1000;
  let localTime = new Date(timestamp + timezoneOffset);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[localTime.getUTCDay()];
  let hours = localTime.getUTCHours();
  let minutes = localTime.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // Set time AFTER calculating day/hours/minutes
  timeElement.innerHTML = `${day} ${hours}:${minutes}`;

  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  windSpeedElement.innerHTML = `${windSpeed} km/h`;

  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature;
}

function searchCity(city) {
  let apiKey = "8051d8dad8aaf85f7ca939803db9f063";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Load default city
searchCity("Warsaw");
