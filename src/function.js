const input=document.querySelector("#recherche")
const loading = document.querySelector("#loading")
const error = document.querySelector("#error")
export function valideInput(){
const city=input.value.trim()
return city
}

 export async function getCity(){
    let ville=valideInput()
     if (!ville) {
    error.textContent = "Please enter a city name"
    error.classList.remove("hidden")
    return
  }
    if(ville){
     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=5&language=fr&countryCode=MA`
     const response=await fetch(url)
     if(!response.ok){
        throw new Error("API Error")
     }  
     const data=await response.json()
      if (!data.results || data.results.length === 0) {
      throw new Error("City not found")
    }

     const X=data.results[0]
     const obj={
        city : X.name ,
        latitude : X.latitude,
        longitude:X.longitude
     } 
     return obj 
    }
   
}