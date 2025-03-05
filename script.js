// API Key

// http://api.weatherapi.com/v1/current.json?key=5312652ec7f74e7d87440402252102&q=Midnapur&aqi=no

// ELEMENTS

const elements = {
  input: document.querySelector('.search-container input'),
  searchBtn: document.querySelector('#search-btn'),
  locationText: document.querySelector('#result h2'),
  weather: document.querySelector('#result .weather'),
  humidity: document.querySelector('#result .humidity'),
  img: document.querySelector('#result img'),
  weatherImg: document.querySelector('#result img'),
  temp: document.querySelector('#result h1'),
  windDirection: document.querySelector('.wind_direction'),
  windSpeed: document.querySelector('.wind_speed'),
  resultCont: document.querySelector('#result')
}

// CONSTANTS

const baseUrl =
  'http://api.weatherapi.com/v1/current.json?key=5312652ec7f74e7d87440402252102'

async function fetchWeather (location) {
  try{
  const stringResponse = await fetch(`${baseUrl}&q=${location}&aqi=no`)
  if (!stringResponse.ok) {
    throw new Error ("Failed to fetch location.")
  }
  const response = await stringResponse.json()

  const weather = response.current.condition.text
  const humidity = response.current.humidity
  const weatherIcon = response.current.condition.icon
  const celsius = response.current.temp_c
  const windDirection = response.current.wind_dir
  const windSpeed = response.current.wind_kph


  elements.resultCont.innerHTML = `
   <h2>${location.toUpperCase()}</h2>
        <p class="weather">${weather} </p>
        <p class="humidity">HUMIDITY: ${humidity}</p>
        <img src="https:${weatherIcon}" alt="">
        <h1>${celsius} &deg;</h1>
        <div class="wind-container">
          <div>
            <p class="title">wind dir</p>
            <p class=" wind_direction wind">${windDirection}</p>
          </div>
          <div>
            <p class="title">wind kph</p>
            <p class=" wind_speed wind">${windSpeed}</p>
          </div>
        </div>
  `
} catch(err){
  console.error("Error feteching weather" + err)
  elements.resultCont.innerHTML = ` <p class="error">City not found.</p>`
}
}

// EVENT LISTENERS

elements.searchBtn.addEventListener('click', () => {
  fetchWeather(elements.input.value)
})
elements.input.addEventListener('keydown', evt => {
  if (evt.key === 'Enter') {
    fetchWeather(elements.input.value)
  }
})

// Set Default Weather
document.addEventListener("DOMContentLoaded", ()=>{
  fetchWeather("india")
  elements.input.value = "india"
})