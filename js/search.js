// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const location = document.getElementById('locationInput').value;
  fetchWeather(location);
}

// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', handleFormSubmit);

// Display forecast information
//  const forecastDiv = document.getElementById('forecast');
//  forecastDiv.innerHTML = `
//  <h2>Forecast for ${forecast.date}</h2>
//  <p>Max Temperature: ${forecast.day.maxtemp_c}°C (${forecast.day.maxtemp_f}°F)</p>
//   <p>Min Temperature: ${forecast.day.mintemp_c}°C (${forecast.day.mintemp_f}°F)</p>
//   <p>Condition: ${forecast.day.condition.text}</p>
//  `;