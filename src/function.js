const input=document.querySelector("#recherche")
const loading = document.querySelector("#loading")
const error = document.querySelector("#error")
export function valideInput(){
const city=input.value.trim()
return city
}

export async function getCity(){
  let ville = valideInput()
  let errorMessage = ""

  error.classList.add("hidden")
  loading.classList.remove("hidden")

  try {
    if (!ville) {
      errorMessage = "Please enter a city name"
    } else {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=5&language=fr&countryCode=MA`
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