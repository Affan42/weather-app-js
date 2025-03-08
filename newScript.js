// Config
const API_KEY = '5312652ec7f74e7d87440402252102';
const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

// Elements - using destructuring for cleaner code
const elements = {
  input: document.querySelector('.search-container input'),
  searchBtn: document.querySelector('#search-btn'),
  resultCont: document.querySelector('#result')
};

// Format location name for better display
function formatLocation(location) {
  return location
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Main function to fetch and display weather
async function fetchWeather(location) {
  if (!location || location.trim() === '') {
    showError('Please enter a location');
    return;
  }

  // Show loading state
  elements.resultCont.innerHTML = '<p class="loading">Loading weather data...</p>';
  
  try {
    // Use HTTPS instead of HTTP for security
    const response = await fetch(`${BASE_URL}&q=${location}&aqi=no`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    displayWeather(data, location);
  } catch (err) {
    console.error("Error fetching weather:", err);
    showError('Location not found or network issue');
  }
}

// Separate display logic from fetch logic
function displayWeather(data, searchLocation) {
  const { current, location } = data;
  const { condition, humidity, temp_c, wind_dir, wind_kph } = current;
  
  const formattedLocation = formatLocation(location.name);
  
  elements.resultCont.innerHTML = `
    <h2>${formattedLocation}</h2>
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

// Show error messages in a consistent way
function showError(message) {
  elements.resultCont.innerHTML = `<p class="error">${message}</p>`;
}

// Event Listeners - consolidated with input validation
function handleSearch() {
  const locationInput = elements.input.value.trim();
  fetchWeather(locationInput);
}

elements.searchBtn.addEventListener('click', handleSearch);

elements.input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Set default weather with a more specific location
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("New Delhi");
  elements.input.value = "New Delhi";
});