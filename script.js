
// API Key

// http://api.weatherapi.com/v1/current.json?key=5312652ec7f74e7d87440402252102&q=Midnapur&aqi=no


// ELEMENTS

const elements = {
    input: document.querySelector(".search-container input"),
    searchBtn: document.querySelector("#search-btn") ,
    locationText: document.querySelector("#result h2"),
    weather: document.querySelector("#result .weather"),
    humidity: document.querySelector("#result .humidity"),
    img: document.querySelector("#result img"),
    weatherImg: document.querySelector("#result img"),
    temp: document.querySelector("#result h1"),
    windDirection: document.querySelector(".wind_direction"),
    windSpeed: document.querySelector(".wind_speed"), 
}

// CONSTANTS

const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=5312652ec7f74e7d87440402252102'

async function fetchWeather(location){
    
    const  stringResponse = await fetch(`${baseUrl}&q=${location}&aqi=no`)
    const response = await stringResponse.json()
    console.log(response)
    const weather = response.current.condition.text
    const humidity = response.current.humidity
    const weatherIcon = response.current.condition.icon
    const celsius = response.current.temp_c
    const windDirection = response.current.wind_dir
    const windSpeed = response.current.wind_kph
    
    elements.locationText.innerText = location.toUpperCase()
    elements.weather.innerHTML = weather
    elements.humidity.innerHTML = `HUMIDITY: ${humidity}`
    elements.img.src = `https:${weatherIcon}`
    elements.temp.innerHTML = `${celsius} &deg;`
elements.windDirection.innerHTML = windDirection
elements.windSpeed.innerHTML = windSpeed

} 


// EVENT LISTENERS

elements.searchBtn.addEventListener("click", ()=>{
    fetchWeather(elements.input.value)
})
elements.input.addEventListener("keydown", (evt)=>{
    if(evt.key === "Enter"){
        fetchWeather(elements.input.value)
    }
})
