# 🌤️ WeatherNow

<div align="center">

**Weather for any city, at a glance.**

A clean, responsive weather app built with vanilla JavaScript, Tailwind CSS, and Vite — powered by the Open-Meteo API.

`HTML` · `Tailwind CSS` · `JavaScript` · `Vite` · `Open-Meteo`

</div>

## 🔍 Overview

WeatherNow is a single-page weather app. It converts the city you enter into coordinates with the Open-Meteo Geocoding API, then fetches current conditions and a 7-day forecast for that location.

**Main features**

- Search for a city by name.
- Current temperature, feels-like temperature, humidity, wind speed, and weather condition.
- 7-day forecast with weekday, date, icon, and min/max temperatures.
- Loading and error states for empty input, unknown cities, and failed requests.
- Responsive card layout with a full-screen background image.

## 🧰 Technologies

| Area | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Logic | JavaScript (ES modules) |
| Build tool | Vite v8 |
| Weather data | Open-Meteo API |

## 🔌 API Integration

| Endpoint | Purpose |
| --- | --- |
| `https://geocoding-api.open-meteo.com/v1/search` | Finds a city and returns its latitude and longitude. |
| `https://api.open-meteo.com/v1/forecast` | Returns current weather and daily forecast data for those coordinates. |

The geocoding call uses `name={city}`, `count=5`, and `language=fr`. The app keeps the first result.

The forecast call uses these parameters:

| Scope | Parameters |
| --- | --- |
| Current | `temperature_2m`, `relative_humidity_2m`, `apparent_temperature`, `weather_code`, `wind_speed_10m` |
| Daily | `weather_code`, `temperature_2m_max`, `temperature_2m_min` |
| Options | `timezone=auto`, `forecast_days=7` |

The API's default units are used: °C for temperature, km/h for wind, and % for humidity.

## ⚠️ API Limitations

- The free Open-Meteo API is intended for **non-commercial use**; commercial use requires a paid plan.
- Published free-tier limits include **600 calls/minute**, **5,000 calls/hour**, and **10,000 calls/day**, applied per IP address and application.
- Forecasts can cover up to 16 days; this app requests 7.
- Geocoding can return multiple matches. Since only the first result is used, an ambiguous city name may resolve to an unexpected place.
- Open-Meteo returns numeric WMO weather codes, not text descriptions; the app maps them locally.
- No API key or environment variables are required for this usage.

## 📦 Example API Response

**Geocoding** — simplified:

```json
{
  "results": [
    {
      "name": "Nador",
      "latitude": 35.16813,
      "longitude": -2.93352
    }
  ]
}
```

**Forecast** — simplified, with 2 of the 7 days shown:

```json
{
  "timezone": "Africa/Casablanca",
  "current_units": {
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "wind_speed_10m": "km/h"
  },
  "current": {
    "time": "2026-11-11T11:00",
    "temperature_2m": 22.9,
    "relative_humidity_2m": 73,
    "apparent_temperature": 25.4,
    "weather_code": 3,
    "wind_speed_10m": 2.5
  },
  "daily_units": {
    "temperature_2m_max": "°C",
    "temperature_2m_min": "°C"
  },
  "daily": {
    "time": ["2026-11-11", "2026-11-12"],
    "weather_code": [61, 3],
    "temperature_2m_max": [25.5, 24.9],
    "temperature_2m_min": [18.0, 18.4]
  }
}
```

| Field | Meaning |
| --- | --- |
| `results[0]` | First geocoding match; the app uses its `name`, `latitude`, and `longitude`. |
| `current` | Current conditions: temperature, humidity, feels-like temperature, weather code, and wind. |
| `daily` | Parallel arrays; index `i` across all arrays describes the same day. |
| `weather_code` | WMO code mapped to an emoji and a French condition label. |
| `*_units` | Units for the returned values. |

## 🖥️ How Data Is Displayed

1. **Search** — the user types a city and clicks **Search**.
2. **Geocode** — `getCity()` validates the input, calls the geocoding endpoint, and returns the first match's city name and coordinates.
3. **Fetch** — `getWeather()` requests current and daily data for those coordinates.
4. **Current card** — `displayWeather()` fills in the city name, icon, temperature, condition, humidity, wind, and feels-like temperature.
5. **Forecast list** — `displayForecast()` loops through the 7 days, maps WMO codes through `WEATHER_CODES` in `src/icon.js`, formats the weekday and date, and shows the min/max temperatures.
6. **States** — `src/main.js` shows the loading indicator and hides previous results during a new search; errors appear in the inline alert.

## 🧪 Testing & Validation

All implemented test scenarios were manually executed successfully.

| Test Case | Expected Behavior | Result |
| --- | --- | --- |
| Empty city input | Displays an error asking the user to enter a city. | ✅ Passed |
| Unknown city | Displays "City not found". | ✅ Passed |
| Network/API failure | Displays an error message when a request fails. | ✅ Passed |
| Valid city search | Retrieves the city's coordinates and weather data. | ✅ Passed |
| Missing current weather data | Displays an appropriate unavailable-data error. | ✅ Passed |
| Unknown current weather code | Displays "Unknown weather condition". | ✅ Passed |
| Unknown forecast weather code | Displays a fallback icon (❓). | ✅ Passed |
| Successful forecast retrieval | Displays the 7-day forecast with dates and min/max temperatures. | ✅ Passed |

**Test Status:** 8/8 test scenarios passed successfully.

## 🚀 Installation & Launch

**Requirement:** Node.js with npm.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

To create and preview a production build:

```bash
npm run build
npm run preview
```

---

<div align="center">

Weather data by [Open-Meteo](https://open-meteo.com/) (CC BY 4.0) · Built with Vite & Tailwind CSS

</div>