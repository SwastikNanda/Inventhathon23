// var season;
var sun;
var temperature;
var humidity;


const api = {
    key: "edeab658b239d568e3e91f73c914407c",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const season = document.querySelector('.season');
  const crop = document.querySelector('.crop');
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
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let hu = document.querySelector('.humidity');
    hu.innerText="Humidity- "+weather.main.humidity+"%";

    let ws = document.querySelector('.windspeed');
    ws.innerText="Windspeed- "+weather.wind.speed+" m/Sec";
    
    let sl = document.querySelector('.sunlight');
    sl.innerText="Sunlight- "+Math.round(-(weather.sys.sunrise-weather.sys.sunset)/3600)+"hrs approx.";
    compareSeason(season.value,crop.value);
  }



  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // if(month=="November"|| month=="December"|| month=="January"|| month=="Feburary")
    // {
    //   season="Rabi";
    // }  
    // else if(month=="March"|| month=="April"){
    //   season="Zaid";
    // }
    // else{
    //     season="Kharif";
    // }
    return `${day} ${date} ${month} ${year}`;
  }

  function compareSeason(season,crop){
    let temp = document.querySelector('.current .temp');
    let hu = document.querySelector('.humidity');
    let sl = document.querySelector('.sunlight');
    console.log(temp.innerText);
    console.log(hu.innerText);
    console.log(sl.innerText);
    console.log(season);
    console.log(crop);
    let humidity=hu.innerText.match(/\d+/g);
    console.log(humidity[0]);
    let temperature=temp.innerText.match(/\d+/g);
    console.log(temperature[0]);
    let sn=sl.innerText.match(/\d+/g);
    console.log(sn[0]);
     // SN=> SUNLIGHT HOURS
// TEMP=> TEMPERATURE IN CELCIUS
// RAINFALL=> IN CM
// HUMIDITY=> IN %

let det=document.querySelector('.details');
 

// RABI CROPS DATA
if (season == "Rabi"|| season=="rabi" || season=="RABI") 
{
    if (sn[0] < 6 && sn[0] > 8) {
        print("SNG");
    }
    //SUNLIGHT HOURS SAME FOR ALL

    if (crop == "Wheat") 
    {
        count = 0;
            if(temperature[0] < 10 ){
            det.innerHTML=
            "<h2>Details</h2>"+
            "<h4>Less Temperature provided to crops.</h4> <h4>Solutions-</h4>"+" <br /> "+
            "<ul>"+
            "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>"+
            "<li>Use crop varieties that are adapted to cooler temperatures.</li>"+
            "<li>Use drip irrigation or other water-saving techniques to ensure the crop receives adequate moisture.</li>"+
            "</ul>";
            count += 1;
            }
            else if(temperature[0] > 25){

            }

        else if (humidity[0] < 40) {
            print("HNG");
            count += 1;
        }
        else if(humidity[0] > 50){

        }
        else{
            det.innerHTML="<h3>Details-</h3><br><p>No Issues detected related to Temperature or Humidity</p>";
        }
    } 


    else if (crop == "Mustard") 
    {
        count = 0;
        if (temperature[0] < 10 && temperature[0] > 25) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Barley") 
    {
        count = 0;
        if (temperature[0] < 10 && temperature[0] > 20) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 50 && humidity[0] > 70) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Chickpea") 
    {
        count = 0;
        if (temperature[0] < 15 && temperature[0] > 25) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Lentil") 
    {
        count = 0;
        if (temperature[0] < 15 && temperature[0] > 25) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Potatoes") 
    {
        count = 0;
        if (temperature[0] < 15 && temperature[0] > 20) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 70 && humidity[0] > 80) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Tomatoes") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 30) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 50 && humidity[0] > 70) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Peas") 
    {
        count = 0;
        if (temperature[0] < 10 && temperature[0] > 20) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Cumin") 
    {
        count = 0;
        if (temperature[0] < 15 && temperature[0] > 25) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Coriander") 
    {
        count = 0;
        if (temperature[0] < 15 && temperature[0] > 25) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Fenugreek") 
    {
        count = 0;
        if (temperature[0] < 15 && temperature[0] > 25) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 50) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }
}








//KHARIF CROPS DATA

else if(season=="Kharif")
{
    if (crop!="Rice" && crop!="Turmeric" && (sn[0] < 6 && sn[0] > 8)) {
        print("SNG");
    }
    if((crop=="Rice" || crop=="Turmeric") && (sn[0] < 4 && sn[0] > 6))
    {
        print("SNG");
    }
    if (crop == "Rice") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 37) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 80 && humidity[0] > 85) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }

    else if (crop == "Cotton") 
    {
        count = 0;
        if (temperature[0] < 21 && temperature[0] > 30) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 60 && humidity[0] > 80) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Sugarcane") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 35) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 70 && humidity[0] > 80) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Turmeric") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 30) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 70 && humidity[0] > 80) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Maize") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 32) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 60 && humidity[0] > 80) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Moong Dal") 
    {
        count = 0;
        if (temperature[0] < 25 && temperature[0] > 35) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 50 && humidity[0] > 70) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "GroundNut") 
    {
        count = 0;
        if (temperature[0] < 25 && temperature[0] > 35) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 50 && humidity[0] > 70) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Bajra") 
    {
        count = 0;
        if (temperature[0] < 25 && temperature[0] > 35) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 30 && humidity[0] > 40) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Jowar") 
    {
        count = 0;
        if (temperature[0] < 25 && temperature[0] > 35) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 30 && humidity[0] > 40) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "Pumpkin") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 30) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 40 && humidity[0] > 60) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }


    else if (crop == "WaterMelon") 
    {
        count = 0;
        if (temperature[0] < 20 && temperature[0] > 30) {
            print("TNG");
            count += 1;
        }
        if (humidity[0] < 60 && humidity[0] > 70) {
            print("HNG");
            count += 1;
        }

        if (count > 0) {
            alert("dikat");
        }
    }
    

}









//ZAID CROPS DATA
else
{
    count=0;
    if (sun < 6 && sun > 8) {
        print("SNG");
    }
    if (temperature[0] < 25 && temperature[0] > 35) {
        print("TNG");
        count += 1;
    }
    if (humidity[0] < 60 && humidity[0] > 70) {
        print("HNG");
        count += 1;
    }

    if (count > 0) {
        alert("dikat");
    }
//SARA DATA SAME HAI SARI CROPS KE LIYE ZAID ME
      
}

  }


