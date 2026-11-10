import { getCity,getWeather,displayWeather } from './function'
import './style.css'
const btn=document.querySelector("#btn")
btn.addEventListener("click",getCity)
btn.addEventListener("click",getWeather)
const city = await getCity();
if (city) {
  const data = await getWeather(city);
  if (data) displayWeather(data, city.city);
}