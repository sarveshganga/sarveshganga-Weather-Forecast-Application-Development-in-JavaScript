const Apikey = "a2106db443122e90509b2567717c28aa";

const cityinput = document.querySelector("#inputcity");
const searchButton = document.querySelector("#btn");
const weathericon = document.querySelector("#icon");
const weathercard = document.querySelector("#weather-card");

// Helper function to get a formatted date string
const getFormattedDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to get past 5-day forecast (using current 5-day forecast and adjusting dates)
const getForecast = async (city) => {
  const apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Apikey}&units=metric`;

  try {
    const response = await fetch(apiurl);
    const data = await response.json();

    if (!data.list) {
      console.error("No forecast data found for the specified city.");
      return;
    }

    // Updating the city information on the page
    document.querySelector("#City").innerHTML = data.city.name;

    // Clear previous forecast cards
    weathercard.innerHTML = "";

    // Loop over the forecast data and adjust dates to simulate past 5 days
    for (let i = 0; i < 5; i++) {
      const forecast = data.list[i * 8]; // OpenWeatherMap provides 3-hourly forecasts, pick one forecast per day (every 8th)
      let forecastDate = new Date();
      forecastDate.setDate(forecastDate.getDate() - (5 - i)); // Subtract days to get the past 5 days

      const weatherCondition = forecast.weather[0].main.toLowerCase();
      let iconSrc = "";

      // Set the appropriate weather icon
      if (weatherCondition === "clouds") {
        iconSrc = "https://openweathermap.org/img/wn/02d.png";
      } else if (weatherCondition === "clear") {
        iconSrc = "https://openweathermap.org/img/wn/01d.png";
      } else if (weatherCondition === "rain") {
        iconSrc = "https://openweathermap.org/img/wn/10d.png";
      }

      // Create forecast card
      const forecastCard = `
        <li class="card mx-5 bg-gray-600 text-white text-center rounded-2xl">
            <h2>${getFormattedDate(forecastDate)}</h2>
            <img class="forecast-icon" src="${iconSrc}" width="100px" height="100px" alt="forecast icon">
            <h4>Temp: <span class="forecast-temp">${forecast.main.temp}</span>°C</h4>
            <h4>Humidity: <span class="forecast-humidity">${forecast.main.humidity}</span>%</h4>
            <h4>Wind: <span class="forecast-wind">${forecast.wind.speed}</span> km/h</h4>
        </li>
      `;

      // Append forecast card to the list
      weathercard.innerHTML += forecastCard;
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
};

// Event listener for the search button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityinput.value;
  getForecast(city);
});
const  weather=async()=> {

  var location = document.getElementById("location");
  var apiKey = 'a2106db443122e90509b2567717c28aa';
  var url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

  fetch(upi).then(res=>res.json()).then(data=>{
    const{name}=data[0];
    getForecast(name,latitude,longitude)
  })
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

     $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
      $('#temp').html(data.currently.temperature + '° F');
      $('#minutely').html(data.minutely.summary);
    });
  }
  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
  location.innerHTML = "Locating...";
}

weather();