const API_KEY = "const API_KEY = "7268532aee7e97d242365d1753630c71";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const description = document.getElementById("description");
const date = document.getElementById("date");

const weatherIcons = {
    "01":"https://openweathermap.org/img/wn/01d@2x.png",
    "02":"https://openweathermap.org/img/wn/02d@2x.png",
    "03":"https://openweathermap.org/img/wn/03d@2x.png",
    "04":"https://openweathermap.org/img/wn/04d@2x.png",
    "09":"https://openweathermap.org/img/wn/09d@2x.png",
    "10":"https://openweathermap.org/img/wn/10d@2x.png",
    "11":"https://openweathermap.org/img/wn/11d@2x.png",
    "13":"https://openweathermap.org/img/wn/13d@2x.png",
    "50":"https://openweathermap.org/img/wn/50d@2x.png"
};

async function getWeather(city){

    try{

        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        if(!response.ok){
            throw new Error();
        }

        const data = await response.json();

        displayWeather(data);

    }catch{

        weatherInfo.classList.remove("show");
        errorMsg.classList.add("show");

    }

}

async function getWeatherByLocation(lat,lon){

    try{

        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        displayWeather(data);

    }catch{

        alert("Unable to get weather.");

    }

}

function displayWeather(data){

    errorMsg.classList.remove("show");
    weatherInfo.classList.add("show");

    temperature.textContent=Math.round(data.main.temp)+"°C";

    cityName.textContent=data.name+", "+data.sys.country;

    humidity.textContent=data.main.humidity+"%";

    windSpeed.textContent=Math.round(data.wind.speed*3.6)+" km/h";

    feelsLike.textContent=Math.round(data.main.feels_like)+"°C";

    visibility.textContent=(data.visibility/1000).toFixed(1)+" km";

    description.textContent=data.weather[0].description;

    weatherIcon.src=weatherIcons[data.weather[0].icon.slice(0,2)];

    sunrise.textContent=new Date(data.sys.sunrise*1000).toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });

    sunset.textContent=new Date(data.sys.sunset*1000).toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });

    date.textContent=new Date().toDateString();

    changeBackground(data.weather[0].main);

}

function changeBackground(weather){

    switch(weather){

        case "Clear":
            document.body.style.backgroundImage="url('clear.png')";
            break;

        case "Clouds":
            document.body.style.backgroundImage="url('clouds.png')";
            break;

        case "Rain":
            document.body.style.backgroundImage="url('rain.png')";
            break;

        case "Drizzle":
            document.body.style.backgroundImage="url('drizzle.png')";
            break;

        case "Snow":
            document.body.style.backgroundImage="url('snow.png')";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            document.body.style.backgroundImage="url('mist.png')";
            break;

        default:
            document.body.style.backgroundImage="url('clear.png')";
    }

}

searchBtn.addEventListener("click",()=>{

    const city=cityInput.value.trim();

    if(city){

        getWeather(city);

    }

});

cityInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

locationBtn.addEventListener("click",()=>{

    navigator.geolocation.getCurrentPosition((position)=>{

        getWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
        );

    });

});

window.onload = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        getWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
        );
    });
};
