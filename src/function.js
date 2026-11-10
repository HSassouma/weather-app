import { WEATHER_CODES } from "./icon" 
const input=document.querySelector("#recherche")
const loading = document.querySelector("#loading")
const error = document.querySelector("#error")
export function valideInput(){
const city=input.value.trim()
return city
}
// get Data city 
export async function getCity(){
  let ville = valideInput()
  let errorMessage = ""

  error.classList.add("hidden")
  loading.classList.remove("hidden")

  try {
    if (!ville) {
      errorMessage = "Please enter a city name"
    } else {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=5&language=fr&countryCode=MA`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("API Error")
      }
      const data = await response.json()
      if (!data.results || data.results.length === 0) {
        throw new Error("City not found")
      }

      const X = data.results[0]
      const obj = {
        city : X.name,
        latitude : X.latitude,
        longitude : X.longitude
      }
      return obj
    }
  }
  catch(err){
    if (err.message === "City not found") {
      errorMessage = "City not found"
    } else {
      errorMessage = "Connection error. Please check your internet."
    }
  }
  finally{
    await new Promise(resolve => setTimeout(resolve, 1000))
    loading.classList.add("hidden")
  }

  if (errorMessage) {
    error.textContent = errorMessage
    error.classList.remove("hidden")
  }
}

// get Data weather of city

export async function getWeather(){
    let errorMessage=""
    error.classList.add("hidden");
 try{
   const city= await getCity()

     if(city){
         const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
        const response=await fetch(url)
         if (!response.ok) {
        throw new Error("API Error")
      }
       const data = await response.json()
       console.log(data)
       return data
     }
     else{  
      return 
     }
  }
 catch(err){
   console.log(err)
   errorMessage="Unable to get weather data .Please try again"
}
 if (errorMessage) {
    error.textContent = errorMessage
    error.classList.remove("hidden")
  }
}

// afficher les donnees currant
export async function displayWeather(data){
  const currant=data.current
  console.log(currant)
}