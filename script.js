const API_KEY = "const API_KEY = "7268532aee7e97d242365d1753630c71";
const locationBtn = document.getElementById("locationBtn");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const date = document.getElementById("date");
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

const weatherIcons = {
    "01": "https://cdn-icons-png.flaticon.com/512/869/869869.png", // clear
    "02": "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", // few clouds
    "03": "https://cdn-icons-png.flaticon.com/512/414/414927.png", // clouds
    "04": "https://cdn-icons-png.flaticon.com/512/414/414927.png", // broken clouds
    "09": "https://cdn-icons-png.flaticon.com/512/3351/3351979.png", // shower rain
    "10": "https://cdn-icons-png.flaticon.com/512/3351/3351979.png", // rain
    "11": "https://cdn-icons-png.flaticon.com/512/1146/1146860.png", // thunderstorm
    "13": "https://cdn-icons-png.flaticon.com/512/642/642102.png", // snow
    "50": "https://cdn-icons-png.flaticon.com/512/4005/4005901.png" // mist
};

async function getWeather(city) {
    try {
        const response = await fetch(
            `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        showError();
    }
}

function displayWeather(data) {
    errorMsg.classList.remove("show");
    weatherInfo.classList.add("show");

    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    const iconCode = data.weather[0].icon.slice(0, 2);
    weatherIcon.src = weatherIcons[iconCode] || weatherIcons["01"];
}

function showError() {
    weatherInfo.classList.remove("show");
    errorMsg.classList.add("show");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

// Load a default city on page load
window.addEventListener("load", () => {
    getWeather("London");
});
