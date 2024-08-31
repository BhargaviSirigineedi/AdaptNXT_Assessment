const axios = require('axios');
require('dotenv').config();

// API Key and Base URL from Weatherstack API
const API_KEY = process.env.WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com/current';

// Function to fetch weather information
async function getWeather(city) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                access_key: API_KEY,
                query: city
            }
        });
        const data = response.data;

        if (data.success === false) {
            console.error(`Error: ${data.error.info}`);
            return;
        }

        const { location, current } = data;
        console.log(`Weather in ${location.name}, ${location.country}:`);
        console.log(`Temperature: ${current.temperature}°C`);
        console.log(`Weather: ${current.weather_descriptions.join(', ')}`);
        console.log(`Humidity: ${current.humidity}%`);
        console.log(`Wind Speed: ${current.wind_speed} km/h`);
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
    }
}

// Example usage
const city = process.argv[2];  // Get city from command line arguments
if (city) {
    getWeather(city);
} else {
    console.log('Please provide a city name.');
}