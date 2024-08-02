// Get references to HTML elements
// const locationInput = document.getElementById('location-input');
// const searchButton = document.getElementById('search-button');
const loadingSpinner = document.getElementById('loading-spinner');
// const weatherDisplay = document.getElementById('weather-display');

// Define constants for API URL and API key
const apiKey = 'YOUR_API_KEY_HERE';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

// Function to display loading spinner
function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

// Function to hide loading spinner
function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}

// Function to fetch weather data from the API
async function fetchWeatherByLocation(latitude, longitude) {
  const url = `${apiUrl}?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;
  showLoadingSpinner();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    hideLoadingSpinner();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    hideLoadingSpinner();
    alert('Failed to fetch weather data. Please try again.');
  }
}

// Function to display weather data
function displayWeather(data) {
  // Extract necessary data from the JSON
  const { location, current: currentWeather } = data;
  // const forecast = data.forecast.forecastday[0];

  // Display current weather information
  const weatherInfo = document.getElementById('weather-info');
  const weatherHeader = document.getElementById('weather-header');
  
  // Assuming you want the forecast for the first day
  weatherHeader.innerHTML = `
    <h2>${location.name}</h2>
    <span>${currentWeather.temp_c}°C</span>
    <p>${currentWeather.condition.text}</p>
    <p>H: ${currentWeather.humidity}% W: ${currentWeather.wind_kph} km/h ${currentWeather.wind_dir}</p>
  `;

  weatherInfo.innerHTML = `
    <div class="card">
      <h2 class="card-title">Last Updated: ${currentWeather.last_updated} is_day</h2>
      <div class="flex">
        ${createWeatherCard('Pressure', currentWeather.pressure_in, '../assets/icon/0.svg')}
        ${createWeatherCard('Cloud', currentWeather.cloud, '../assets/icon/1.svg')}
        ${createWeatherCard('Visibility', currentWeather.vis_km, '../assets/icon/2.svg')}
        ${createWeatherCard('UV', currentWeather.uv, '../assets/icon/3.svg')}
        ${createWeatherCard('Wind', currentWeather.gust_kph, '../assets/icon/4.svg')}
      </div>
      <div class="card-info flex">
        ${createAirQualityCard('CO', currentWeather.air_quality.co, '../assets/icon/5.svg')}
        ${createAirQualityCard('NO2', currentWeather.air_quality.no2, '../assets/icon/6.svg')}
        ${createAirQualityCard('O3', currentWeather.air_quality.o3, '../assets/icon/7.svg')}
        ${createAirQualityCard('SO2', currentWeather.air_quality.so2, '../assets/icon/8.svg')}
        ${createAirQualityCard('PM2.5', currentWeather.air_quality.pm2_5, '../assets/icon/9.svg')}
        ${createAirQualityCard('PM10', currentWeather.air_quality.pm10, '../assets/icon/10.svg')}
      </div>
    </div>
  `;
}

// Helper function to create weather cards
function createWeatherCard(title, value, icon) {
  return `
    <div class="card-info">
      <h2 class="card-title">${title}</h2>
      <img class="card-icon" src="${icon}" alt="${title.toLowerCase()}" />
      <p class="card-description">${value}</p>
    </div>
  `;
}

// Helper function to create air quality cards
function createAirQualityCard(title, value, icon) {
  return `
    <div class="card-basic">
      <h2 class="card-title">${title}</h2>
      <img class="card-icon" src="${icon}" alt="air_quality_${title.toLowerCase()}" />
      <p class="card-description">${value}</p>
    </div>
  `;
}

// Function to handle successful retrieval of user's location
function successCallback(position) {
  const { latitude, longitude } = position.coords;
  fetchWeatherByLocation(latitude, longitude);
}

// Function to handle errors while retrieving user's location
function errorCallback(error) {
  console.error('Error retrieving location:', error);
  alert('Failed to retrieve your location. Please try again.');
}

// Function to get user's location and fetch weather data
function getLocationAndFetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Call getLocationAndFetchWeather() to initiate the process
getLocationAndFetchWeather();