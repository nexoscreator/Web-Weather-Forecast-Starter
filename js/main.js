// Get references to HTML elements
// const locationInput = document.getElementById('location-input');
// const searchButton = document.getElementById('search-button');
const loadingSpinner = document.getElementById('loading-spinner');
// const weatherDisplay = document.getElementById('weather-display');

// Define constants for API URL and API key
const apiKey = 'fbcf94b5f2a248b4bda53901242203';
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
function fetchWeatherByLocation(latitude, longitude) {
  const url = `${apiUrl}?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;
  showLoadingSpinner();
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      hideLoadingSpinner();
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      hideLoadingSpinner();
      alert('Failed to fetch weather data. Please try again.');
    });
}

function displayWeather(data) {
  // Extract necessary data from the JSON
  const location = data.location;
  const currentWeather = data.current;
  // const forecast = data.forecast.forecastday[0]; // Assuming you want the forecast for the first day


  // Display current weather information
  const weatherInfo = document.getElementById('weather-info');
  const weatherHeader = document.getElementById('weather-header');

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
    
    <div class="card-info">
    <h2 class="card-title">Pressure<h2>
    <img class="card-icon" src="../assets/icon/0.svg" alt="pressure_in" />
    <p class="card-discription">${currentWeather.pressure_in}</p></div>
    
    <div class="card-info">
    <h2 class="card-title">Cloud<h2>
    <img class="card-icon" src="../assets/icon/1.svg" alt="cloud" />
    <p class="card-discription">${currentWeather.cloud}</p></div>
    
    <div class="card-info">
    <h2 class="card-title">Visibility<h2>
    <img class="card-icon" src="../assets/icon/2.svg" alt="vis_km" />
    <p class="card-discription">${currentWeather.vis_km}</p></div>
    
    <div class="card-info">
    <h2 class="card-title">UV<h2>
    <img class="card-icon" src="../assets/icon/3.svg" alt="uv" />
    <p class="card-discription">${currentWeather.uv}</p></div>
    
    <div class="card-info">
    <h2 class="card-title">Wind<h2>
    <img class="card-icon" src="../assets/icon/4.svg" alt="gust_kph" />
    <p class="card-discription">${currentWeather.gust_kph}</p></div></div>
    
    <div class="card-info flex">
  <div class="card-basic">
  <h2 class="card-title">CO<h2>
    <img class="card-icon" src="../assets/icon/5.svg" alt="air_quality_co" />
    <p class="card-discription">${currentWeather.air_quality.co}</p></div>
    
  <div class="card-basic">
  <h2 class="card-title">NO2<h2>
    <img class="card-icon" src="../assets/icon/6.svg" alt="air_quality_no2" />
    <p class="card-discription">${currentWeather.air_quality.no2}</p></div>
    
  <div class="card-basic">
  <h2 class="card-title">O3<h2>
    <img class="card-icon" src="../assets/icon/7.svg" alt="air_quality_o3" />
    <p class="card-discription">${currentWeather.air_quality.o3}</p></div>
    
  <div class="card-basic">
  <h2 class="card-title">SO2<h2>
    <img class="card-icon" src="../assets/icon/8.svg" alt="air_quality_so2" />
    <p class="card-discription">${currentWeather.air_quality.so2}</p></div>
    
  <div class="card-basic">
  <h2 class="card-title">PM2<h2>
    <img class="card-icon" src="../assets/icon/9.svg" alt="air_quality_pm2_5" />
    <p class="card-discription">${currentWeather.air_quality.pm2_5}</p></div>
    
  <div class="card-basic">
  <h2 class="card-title">PM10<h2>
    <img class="card-icon" src="../assets/icon/10.svg" alt="air_quality_pm10" />
    <p class="card-discription">${currentWeather.air_quality.pm10}</p></div>
    </div>
    </div>
  `;
}

// Function to handle successful retrieval of user's location
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
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