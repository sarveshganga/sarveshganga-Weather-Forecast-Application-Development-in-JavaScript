
const Apikey="a2106db443122e90509b2567717c28aa";

const cityinput=document.querySelector("#inputcity");
const searchButton=document.querySelector("#btn");
 const locationbtn=document.querySelector("#Locationbtn")
const weathericon=document.querySelector("#icon");
 const weathercard=document.querySelector("#wether-card")

 async function displayForeCast(lat, long) {
  const ForeCast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${Apikey}`;
  const data = await fetch(ForeCast_API);
  const result = await data.json();
  // filter the forecast
  const uniqeForeCastDays = [];
  const daysForecast = result.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqeForeCastDays.includes(forecastDate)) {
      return uniqeForeCastDays.push(forecastDate);
    }
  });
  console.log(daysForecast);

  daysForecast.forEach((content, indx) => {
    if (indx <= 3) {
      weathercard.insertAdjacentHTML("afterbegin", forecast(content));
    }
  });
}

// forecast html element data
function forecastcard(weatherItam) {
  

  return `<li id="card">
                        <h2>(${weatherItam.dt_txt.split(" ")[0]})</h2>
                        <img id="icon" src="https://openweathermap.org/img/wn/${weatherItam.weather[0].icon}4x.png" width="100px" height="100px">
                        <h4 id="temp">Temp:${(weatherItam.temp -273.15).toFixed(2)}°C</h4>
                        <h4 id="humidity">Humidity:${weatherItam.main.humidity}%</h4>
                        <h4 id="wind">wind: ${weatherItam.wind.speed} km/h  </h4>

                    </li>`;
}
    
    
   
    
  
    





  getdata= async (city) =>{
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${Apikey}`;
     const response=await fetch(apiurl);
     var data=await response.json();
     console.log(data);

    const {name,lat,lon}=data;
    displayForeCast(name,lat,lon);


     document.querySelector("#City").innerHTML=data.name;
     document.querySelector("#Humidity").innerHTML=data.main.humidity +"%";
     document.querySelector("#temp").innerHTML=data.main.temp+"°C";
     document.querySelector("#wind").innerHTML=data.wind.speed+"km/h";
    document.querySelector("#rain").innerHTML=data.weather[0].description;
     if (data.weather[0].main== "Clouds") {
        weathericon.src="https://openweathermap.org/img/wn/02d.png"
     }else if(data.weather[0].main=="Clear"){
       weathericon.src="https://openweathermap.org/img/wn/01d.png"
     }else if(data.weather[0].main=="Rain"){
      weathericon.src="https://openweathermap.org/img/wn/10d.png"
    }else if(data.weather[0].main=="Drizzle"){
      weathericon.src="https://openweathermap.org/img/wn/09d.png"
    }else if(data.weather[0].main=="thunderstorm"){
      weathericon.src="https://openweathermap.org/img/wn/11d.png"
    }else if(data.weather[0].main=="scattered clouds"){
      weathericon.src="https://openweathermap.org/img/wn/03n.png"
    }else if(data.weather[0].description=="overcast clouds"){
      weathericon.src="https://openweathermap.org/img/wn/04d.png"
    };


}
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  getdata(cityinput.value)

  
});


locationbtn.addEventListener("click",getuser=(e)=>{
  e.preventDefault();

  navigator.geolocation.getCurrentPosition(position=>{
    console.log(position)
  },
  error=>{
    console.log(error)
  }
)
})




// apikey="a2106db443122e90509b2567717c28aa"
//  getforcasting((lat,lon)=>{
//   forcasturl=`api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apikey}` 

//  })