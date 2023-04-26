var season;
var sun;
var crop;
var temperature;
var humidity;


const api = {
    key: "edeab658b239d568e3e91f73c914407c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    const sunrise = new Date((weather.sys.sunrise + weather.timezone) * 1000);
    const sunset = new Date((weather.sys.sunset + weather.timezone) * 1000);
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();


    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    temperature=weather.main.temp;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let hu = document.querySelector('.humidity');
    hu.innerText="Humidity- "+weather.main.humidity+"%";
    humidity=weather.main.humidity;

    let ws = document.querySelector('.windspeed');
    ws.innerText="Windspeed- "+weather.wind.speed+" m/Sec";
    
    let sl = document.querySelector('.sunlight');
    sl.innerText="Sunlight- "+Math.round(-(weather.sys.sunrise-weather.sys.sunset)/3600)+"hrs approx.";
    sun=Math.round(-(weather.sys.sunrise-weather.sys.sunset)/3600);
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    if(month=="November"|| month=="December"|| month=="January"|| month=="Feburary")
    {
      season="Rabi";
    }  
    else if(month=="March"|| month=="April"){
      season="Zaid";
    }
    else{
        season="Kharif";
    }
    return `${day} ${date} ${month} ${year}`;
  }

