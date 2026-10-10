const form = document.getElementById("weather-form");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const apiKeyInput = document.getElementById("api-key");

const locationNameEl = document.getElementById("location-name");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const weatherIconEl = document.getElementById("weather-icon");
const extraInfoEl = document.getElementById("extra-info");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  const country = countryInput.value.trim();
  const apiKey = apiKeyInput.value.trim();

  if (!city || !country || !apiKey) {
    showError("Please fill in all fields (city, country, and API key).");
    return;
  }

  getWeather(city, country, apiKey);
});

function getWeather(city, country, apiKey) {
  const btn = document.getElementById("get-weather-btn");
  btn.disabled = true;
  btn.textContent = "Loading...";

  clearResult();
  hideError();

  const endpoint =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)},${encodeURIComponent(country)}` +
    `&appid=${encodeURIComponent(apiKey)}&units=metric`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw { status: response.status, data };
        });
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => handleFetchError(error))
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Get Weather";
    });
}

function displayWeather(data) {
  const { name, sys, main, weather, wind, visibility, clouds } = data;
  const location = name + (sys.country ? ", " + sys.country : "");

  locationNameEl.textContent = location;
  temperatureEl.textContent = Math.round(main.temp) + "°";
  conditionEl.textContent = weather[0].description;

  const iconCode = weather[0].icon;
  weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${weather[0].description}" width="96" height="96">`;

  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const pressure = main.pressure;
  const windSpeed = Math.round(wind.speed);
  const visibilityKm = Math.round(visibility / 1000);
  const cloudCover = clouds.all;

  extraInfoEl.innerHTML = `
    <div class="info-item">
      <span class="info-label">Feels like</span>
      <span class="info-value">${feelsLike}°C</span>
    </div>
    <div class="info-item">
      <span class="info-label">Humidity</span>
      <span class="info-value">${humidity}%</span>
    </div>
    <div class="info-item">
      <span class="info-label">Pressure</span>
      <span class="info-value">${pressure} hPa</span>
    </div>
    <div class="info-item">
      <span class="info-label">Wind</span>
      <span class="info-value">${windSpeed} m/s</span>
    </div>
    <div class="info-item">
      <span class="info-label">Visibility</span>
      <span class="info-value">${visibilityKm} km</span>
    </div>
    <div class="info-item">
      <span class="info-label">Clouds</span>
      <span class="info-value">${cloudCover}%</span>
    </div>
  `;

  weatherResult.classList.add("active");
}

function handleFetchError(error) {
  let message = "Failed to retrieve weather data. Please try again.";

  if (error.status === 401) {
    message = "Invalid API key. Please verify your OpenWeatherMap API key and try again.";
  } else if (error.status === 404) {
    message = "Location not found. Please check the city and country and try again.";
  } else if (error.status === 400) {
    message = "Invalid request. Please check your inputs and try again.";
  } else if (error.status === 429) {
    message = "Too many requests. Please wait a moment and try again.";
  } else if (!error.status) {
    message = "Unable to connect to the weather service. Please check your connection and try again.";
  }

  showError(message);
}

function showError(message) {
  hideResult();
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
  errorMessage.textContent = "";
}

function clearResult() {
  locationNameEl.textContent = "Location";
  temperatureEl.textContent = "--°";
  conditionEl.textContent = "Weather condition";
  weatherIconEl.innerHTML = "";
  extraInfoEl.innerHTML = "";
  weatherResult.classList.remove("active");
}

function hideResult() {
  weatherResult.classList.remove("active");
}
