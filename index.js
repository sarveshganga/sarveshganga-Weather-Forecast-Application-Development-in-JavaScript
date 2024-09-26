
const Apikey="a2106db443122e90509b2567717c28aa"

const cityinput=document.querySelector("#inputcity");
const searchButton=document.querySelector("#btn");
const weathericon=document.querySelector("#icon");
 const weathercard=document.querySelector("#wether-card")

 
getforcasting




  getdata= async (city) =>{
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${Apikey}`;
     const response=await fetch(apiurl);
     var data=await response.json();
     console.log(data);
     const {name,lat,lon}=data;
getforcasting(name,lat,lon);
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




// apikey="a2106db443122e90509b2567717c28aa"
//  getforcasting((lat,lon)=>{
//   forcasturl=`api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apikey}` 

//  })