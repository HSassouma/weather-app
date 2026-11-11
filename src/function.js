import { WEATHER_CODES } from "./icon.js";

const input = document.querySelector("#recherche");
const error = document.querySelector("#error");

export function valideInput() {
  const city = input.value.trim();
  return city;
}

// get Data city
export async function getCity() {
  let ville = valideInput();
  let errorMessage = "";

  error.classList.add("hidden");

  try {
    if (!ville) {
      errorMessage = "Please enter a city name";
    } else {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=5&language=fr`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
      }

      const X = data.results[0];

      const obj = {
        city: X.name,
        latitude: X.latitude,
        longitude: X.longitude,
      };

      return obj;
    }
  } catch (err) {
    if (err.message === "City not found") {
      errorMessage = "City not found";
    } else {
      errorMessage = "Connection error. Please check your internet.";
    }
  }

  if (errorMessage) {
    error.textContent = errorMessage;
    error.classList.remove("hidden");
  }
}

// get Data weather of city
export async function getWeather(city) {
  let errorMessage = "";

  error.classList.add("hidden");

  try {
    if (city) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      console.log(data);
      return data;
    }

    return;
  } catch (err) {
    console.log(err);
    errorMessage = "Unable to get weather data. Please try again.";
  }

  if (errorMessage) {
    error.textContent = errorMessage;
    error.classList.remove("hidden");
  }
}

// display current weather
export function displayWeather(data, cityName) {
  const current = data.current;
  if (
    !current ||
    current.temperature_2m == null ||
    current.relative_humidity_2m == null ||
    current.apparent_temperature == null ||
    current.wind_speed_10m == null ||
    current.weather_code == null
  ) {
    error.textContent = "Weather data is unavailable. Please try another city.";
    error.classList.remove("hidden");
    return;
  }
  const icon_Weather = WEATHER_CODES[current.weather_code];
  if (!icon_Weather) {
    error.textContent = "Unknown weather condition.";
    error.classList.remove("hidden");
    return;
  }
  const contener = document.querySelector("#donne_current");
  contener.classList.remove("hidden");

  const name_city = document.querySelector("#city-name");
  const icon_principale = document.querySelector("#weather-icon");
  const temperatur = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");
  const feels_like = document.querySelector("#feels-like");

  name_city.textContent = `Weather in ${cityName}`;
  icon_principale.textContent = icon_Weather.icon;
  temperatur.textContent = `${current.temperature_2m}°C`;
  description.textContent = icon_Weather.label;
  humidity.textContent = `${current.relative_humidity_2m}%`;
  wind.textContent = `${current.wind_speed_10m} km/h`;
  feels_like.textContent = `${current.apparent_temperature}°C`;
}
//display dely jours

export function displayForecast(data) {
  const daily = data.daily;
  const container = document.querySelector("#donnee_dely");

  const day = document.querySelectorAll('[id^="forecast-day-"]');
  const date = document.querySelectorAll('[id^="forecast-date-"]');
  const icon = document.querySelectorAll('[id^="forecast-icon-"]');
  const max = document.querySelectorAll('[id^="forecast-max-"]');
  const min = document.querySelectorAll('[id^="forecast-min-"]');

  for (let i = 0; i < 7; i++) {
    const weather = WEATHER_CODES[daily.weather_code[i]];
    if (!weather) {
      icon[i].textContent = "❓";
    } else {
      icon[i].textContent = weather.icon;
    }

    const dateObj = new Date(daily.time[i] + "T12:00:00");

    day[i].textContent = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
    });
    date[i].textContent = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    max[i].textContent = daily.temperature_2m_max[i] + "°C";
    min[i].textContent = daily.temperature_2m_min[i] + "°C";
  }

  container.classList.remove("hidden");
}
