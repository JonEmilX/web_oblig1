// locations 
const locations = [
    { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917 },
    { name: "New York, USA", latitude: 40.7128, longitude: -74.0060 },
    { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
    { name: "Gjovik, Norway", latitude: 60.795429, longitude: 10.691630 },
    { name: "Oslo, Norway", latitude: 59.913868, longitude: 10.752245 }
];

const weatherContainer = document.getElementById('weather_container');

// Fetch
async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`);
        const data = await response.json();
        return {
            location: location.name,
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed,
            weathercode: data.current_weather.weathercode
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { location: location.name, error: 'Unable to fetch data' };
    }
}

// Updates weather data
async function updateWeather() {
    weatherContainer.innerHTML = ''; // clears container

    // wiait for each prosess to complete before continue
    const weatherData = await Promise.all(locations.map(location => fetchWeather(location))); // Fetch new data 
    
    weatherData.forEach(weather => {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather_card');

      
        if (weather) {
            //converts KM/H windspeed to m/s windspeed
            weatherCard.innerHTML = `
                <h3>${weather.location}</h3>
                <p>Temperature: ${weather.temperature}°C</p>

                <p>Wind Speed: ${(weather.windspeed*1000/3600).toFixed(1)} m/s</p>
                <p>Weather Code: ${weather.weathercode}</p>
            `;
        }
        
        weatherContainer.appendChild(weatherCard);
    });
}

updateWeather();

// Update every min
setInterval(updateWeather, 60000); // number in ms
