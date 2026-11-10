import { getCity,getWeather } from './function'
import './style.css'
const btn=document.querySelector("#btn")
btn.addEventListener("click",getCity)
btn.addEventListener("click",getWeather)