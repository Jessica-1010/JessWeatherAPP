function getWeather() {
  const APIKey = "1396289e0818ac67c3c5659f72100c21";
  const cityInput = document.getElementById("city").value;

  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${APIKey}`;

  if (!cityInput) {
    alert("Please enter a city name");
    return;
  }

  fetch(currentWeatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
      alert("Error fetching data. Please try again.");
    });

  fetch(forecastApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
      alert("Error fetching data. Please try again.");
    });
}

function displayWeather(data) {
  const weatherIconInfo = document.getElementById("weather-icon");
  const tempDivInfo = document.getElementById("temp-div");
  const descriptionDivInfo = document.getElementById("description-div");

  tempDivInfo.innerHTML = "";
  descriptionDivInfo.innerHTML = "";

  if (data.cod === "404") {
    descriptionDivInfo.innerHTML = `<p> ${data.message}</p>`;
  } else {
    const currentTemp = Math.round(data.main.temp - 273.15);
    const cityName = data.name;
    const currentWeatherDescription = data.weather[0].description;
    const weatherIconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    const temperatureHTML = `${currentTemp} °C`;
    const currentWeatherHTML = `
    <p>${cityName}</p>
    <p>${currentWeatherDescription}</p>`;

    tempDivInfo.innerHTML = temperatureHTML;
    descriptionDivInfo.innerHTML = currentWeatherHTML;
    weatherIconInfo.src = iconURL;
    weatherIconInfo.alt = currentWeatherDescription;

    showImage();
  }
}

function displayForecast(hourlyData) {
  const forecastDiv = document.getElementById("forecast-div");
  const next24HrsForecast = hourlyData.slice(0, 8);

  forecastDiv.innerHTML = "";

  next24HrsForecast.forEach((itemHourlyData) => {
    const date = new Date(itemHourlyData.dt * 1000);
    const hours = date.getHours();
    const weatherIcon = itemHourlyData.weather[0].icon;
    const windSpeed = Math.round(itemHourlyData.wind.speed);
    const iconURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
    const temperature = Math.round(itemHourlyData.main.temp - 273.15);

    const HourlyItemHTML = `
            <div id="hourlyitem-div">
              
              <p>${hours}:00</p>
              <img src= ${iconURL} alt = "hourly weather icon">
              <p>${temperature}°C</P>
              <p>🍃${windSpeed}</P>
          </div>
          `;
    forecastDiv.innerHTML = forecastDiv.innerHTML + HourlyItemHTML;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
