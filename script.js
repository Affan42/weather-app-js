const API_KEY = '5312652ec7f74e7d87440402252102';
const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

// Elements: Selecting necessary DOM elements for interaction
const elements = {
    input: document.querySelector('.search-container input'), // Input field for entering location
    searchBtn: document.querySelector('#search-btn'), // Button to trigger search
    resultCont: document.querySelector('#result') // Container to display weather data
};

// Fetch weather data from API based on user input
async function fetchWeather(location) {
    elements.resultCont.innerHTML = '<p>Loading weather data...</p>'; // Show loading message

    try {
        const response = await fetch(`${BASE_URL}&q=${location}&aqi=no`); // Fetch data from API

        if (!response.ok) {
            throw new Error("Failed to fetch location."); // Handle errors if response is not ok
        }

        const data = await response.json(); // Convert response to JSON
        displayWeather(data, location); // Display weather data in UI
    } catch (err) {
        console.error("Error fetching weather: " + err);
        elements.resultCont.innerHTML = `<p class="error">City not found.</p>`; // Show error message
    }
}

// UI function: Updates the webpage with fetched weather data
function displayWeather(data, searchLocation) {
    const { current } = data; // Extract current weather data
    const { condition, humidity, temp_c, wind_dir, wind_kph } = current;
    const locationName = data.location.name; // Extract city name

    // Update the UI with weather details
    elements.resultCont.innerHTML = `
     <h2>${locationName}</h2>
     <p class="weather">${condition.text}</p>
     <p class="humidity">Humidity: ${humidity}%</p>
     <img src="https:${condition.icon}" alt="${condition.text} weather icon">
     <h1>${Math.round(temp_c)}°C</h1>
     <div class="wind-container">
       <div>
         <p class="title">Wind Direction</p>
         <p class="wind_direction wind">${wind_dir}</p>
       </div>
       <div>
         <p class="title">Wind Speed</p>
         <p class="wind_speed wind">${wind_kph} km/h</p>
       </div>
     </div>
   `;
}

// Handles search input and fetches weather data
function handleSearch() {
    const locationInput = elements.input.value.trim(); // Get user input
    fetchWeather(locationInput); // Fetch weather for the entered location
}

// Event listeners: Trigger search on button click or Enter key press
elements.searchBtn.addEventListener('click', handleSearch);
elements.input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Default behavior: Fetch and display weather for "New Delhi" on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchWeather("New Delhi");
    elements.input.value = "New Delhi"; // Pre-fill input with default location
});
