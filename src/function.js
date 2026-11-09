const input=document.querySelector("#recherche")
export function valideInput(){
const city=input.value.trim()
return city
}

 export async function getCity(){
    let ville=valideInput()
    if(ville){
     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=5&language=fr&countryCode=MA`
     const response=await fetch(url)
     if(!response.ok){
        throw new Error("API Error")
     }  
     const data=await response.json() 
     return data 
    }
    else{
        alert("Remplir le champ de recherche")
    }
}