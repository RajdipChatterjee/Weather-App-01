document.addEventListener('DOMContentLoaded',() => {
    let cityInput = document.getElementById("city-input");
    let getWeatherInput = document.getElementById("get-weather-btn");
    let weatherInfo = document.getElementById("weather-info");
    let cityNameDisplay = document.getElementById("city-name");
    let temperatureDisplay = document.getElementById("temperature");
    let descriptionDisplay = document.getElementById("description");
    let errorMessage = document.getElementById("error-message");

    const API_KEY = "613d7cf5eee7be5a8e68a602fb01d4b1"; //env variables

    getWeatherInput.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;


        // it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch(error) {
            showError()
        }

    })

    async function fetchWeatherData(city) {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(weatherData) {
        console.log(weatherData);
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden ');
    }
})