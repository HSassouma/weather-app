
import { getCity, getWeather, displayWeather } from "./function.js"
import "./style.css"

const btn = document.querySelector("#btn")
const loading = document.querySelector("#loading")
const error = document.querySelector("#error")

async function searchWeather() {
  loading.classList.remove("hidden")
  document.querySelector("#donne_current").classList.add("hidden")
  error.classList.add("hidden")

  try {
    const city = await getCity()
    if (!city) return

    const data = await getWeather(city)
    if (!data) return

    loading.classList.add("hidden")
    displayWeather(data, city.city)

  } finally {
    loading.classList.add("hidden")
  }
}

btn.addEventListener("click", searchWeather)
          