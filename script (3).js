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


function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}


function displayResults(weather) {
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
    hu.innerText = "Humidity- " + weather.main.humidity + "%";

    let ws = document.querySelector('.windspeed');
    ws.innerText = "Windspeed- " + weather.wind.speed + " m/Sec";

    let sl = document.querySelector('.sunlight');
    sl.innerText = "Sunlight- " + Math.round(-(weather.sys.sunrise - weather.sys.sunset) / 3600) + "hrs approx.";
    compareSeason(season.value, crop.value);
}



function dateBuilder(d) {
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

function compareSeason(season, crop) {
    let temp = document.querySelector('.current .temp');
    let hu = document.querySelector('.humidity');
    let sl = document.querySelector('.sunlight');
    console.log(temp.innerText);
    console.log(hu.innerText);
    console.log(sl.innerText);
    console.log(season);
    console.log(crop);
    let humidity = hu.innerText.match(/\d+/g);
    console.log(humidity[0]);
    let temperature = temp.innerText.match(/\d+/g);
    console.log(temperature[0]);
    let sn = sl.innerText.match(/\d+/g);
    console.log(sn[0]);
    // SN=> SUNLIGHT HOURS
    // TEMP=> TEMPERATURE IN CELCIUS
    // RAINFALL=> IN CM
    // HUMIDITY=> IN %

    let det = document.querySelector('.details');
    det.innerHTML="<h3 class='added_details'>Details</h3>";


    // RABI CROPS DATA
    if (season == "Rabi" || season == "rabi" || season == "RABI") {
        count = 0;
        if (sn[0] < 6) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. Less Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Select crop varieties that are better adapted to low-light conditions</li>" +
                "<li>Use reflective mulch to increase the amount of available light.</li>" +
                "<li>Use artificial light sources, such as grow lights, to supplement natural light.</li>" +
                "</ul>" + "<br /> "

        }
        if (sn[0] > 11) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. More Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Consider using sunscreen sprays or other protective measures to reduce sunburn damage .</li>" +
                "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                "<li>Water the crop more frequently to prevent water stress and wilting.</li>" +
                "</ul>" + "<br /> "

        }
        //SUNLIGHT HOURS SAME FOR ALL

        if (crop == "Wheat" || crop == "wheat" || crop == "WHEAT") {

            if (temperature[0] < 10) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Mustard" || crop == "mustard" || crop == "MUSTARD") {

            if (temperature[0] < 10) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Barley" || crop == "barley" || crop == "BARLEY") {

            if (temperature[0] < 10) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }





        else if (crop == "Chickpea" || crop == "chickpea" || crop == "CHICKPEA") {

            if (temperature[0] < 15) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }







        else if (crop == "Lentil" || crop == "lentil" || crop == "LENTIL") {
            if (temperature[0] < 15) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }







        else if (crop == "Potatoes" || crop == "potatoes" || crop == "POTATOES") {

            if (temperature[0] < 15) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 80) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }







        else if (crop == "Tomatoes" || crop == "tomatoes" || crop == "TOMATOES") {
            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Peas" || crop == "peas" || crop == "PEAS") {
            if (temperature[0] < 10) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Cumin" || crop == "cumin" || crop == "CUMIN") {
            if (temperature[0] < 15) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }







        else if (crop == "Coriander" || crop == "coriander" || crop == "CORIANDER") {
            if (temperature[0] < 15) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Fenugreek" || crop == "fenugreek" || crop == "FENUGREEK") {
            if (temperature[0] < 15) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }
    }








    //KHARIF CROPS DATA
    else if (season == "Kharif") {
        count = 0;
        if (crop != "Rice" && crop != "Turmeric") {
            if (sn[0] < 6) {
                count += 1
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Select crop varieties that are better adapted to low-light conditions</li>" +
                    "<li>Use reflective mulch to increase the amount of available light.</li>" +
                    "<li>Use artificial light sources, such as grow lights, to supplement natural light.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (sn[0] > 9) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Consider using sunscreen sprays or other protective measures to reduce sunburn damage .</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Water the crop more frequently to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }
        }
        if (crop == "Rice" || crop == "Turmeric") {
            if (sn[0] < 4) {
                count += 1
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Select crop varieties that are better adapted to low-light conditions</li>" +
                    "<li>Use reflective mulch to increase the amount of available light.</li>" +
                    "<li>Use artificial light sources, such as grow lights, to supplement natural light.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (sn[0] > 7) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Consider using sunscreen sprays or other protective measures to reduce sunburn damage .</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Water the crop more frequently to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "

            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }

        if (crop == "Rice" || crop == "rice" || crop == "RICE") {

            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 37) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 75) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 85) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Cotton" || crop == "cotton" || crop == "COTTON") {

            if (temperature[0] < 21) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 60) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 80) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }







        else if (crop == "Sugarcane" || crop == "sugarcane" || crop == "SUGARCANE") {

            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 35) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 80) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Turmeric" || crop == "turmeric" || crop == "TURMERIC") {

            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 80) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Maize" || crop == "maize" || crop == "MAIZE") {

            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 32) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 60) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 80) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Moong Dal" || crop == "MOONG DAL" || crop == "moong dal") {

            if (temperature[0] < 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 35) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }





        else if (crop == "Groundnut" || crop == "GROUNDNUT" || crop == "groundnut" || "GroundNut") {

            if (temperature[0] < 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 35) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 50) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }







        else if (crop == "Bajra" || crop == "BAJRA" || crop == "bajra") {

            if (temperature[0] < 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 35) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Jowar" || crop == "jowar" || crop == "JOWAR") {

            if (temperature[0] < 25) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 35) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "Pumpkin" || crop == "PUMPKIN" || crop == "pumpkin") {

            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 40) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 60) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }






        else if (crop == "WaterMelon" || crop == "WATERMELON" || crop == "watermelon") {

            if (temperature[0] < 20) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                    "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                    "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                    "</ul>" + "<br /> "

            }
            else if (temperature[0] > 30) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                    "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                    "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                    "</ul>" + "<br /> "
            }

            if (humidity[0] < 60) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                    "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                    "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                    "</ul>" + "<br /> "
            }
            else if (humidity[0] > 70) {
                count += 1;
                det.innerHTML +=
                    `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                    "<ul class='list'>" +
                    "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                    "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                    "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                    "</ul>" + "<br /> "
            }
            if (count == 0) {
                console.log("No problem");
                det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
            }
        }


    }









    //ZAID CROPS DATA
    else {
        count = 0;
        if (sn[0] < 6) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. Less Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Select crop varieties that are better adapted to low-light conditions</li>" +
                "<li>Use reflective mulch to increase the amount of available light.</li>" +
                "<li>Use artificial light sources, such as grow lights, to supplement natural light.</li>" +
                "</ul>" + "<br /> "

        }
        if (sn[0] > 9) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. More Sunlight Hours than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Consider using sunscreen sprays or other protective measures to reduce sunburn damage .</li>" +
                "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                "<li>Water the crop more frequently to prevent water stress and wilting.</li>" +
                "</ul>" + "<br /> "

        }
        if (temperature[0] < 25) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
                "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
                "<li>Use drip irrigation or other water-saving techniques to ensure  adequate moisture.</li>" +
                "</ul>" + "<br /> "

        }
        else if (temperature[0] > 35) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
                "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
                "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
                "</ul>" + "<br /> "
        }

        if (humidity[0] < 60) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. Less Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
                "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
                "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
                "</ul>" + "<br /> "
        }
        else if (humidity[0] > 70) {
            count += 1;
            det.innerHTML +=
                `<h4 class='added_h4'>${count}. More Humidity than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4> <br /> ` +
                "<ul class='list'>" +
                "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
                "<li>Consider using fungicides or other inputs to prevent or control fungal diseases .</li>" +
                "<li>Use open-field production or other techniques that promote good air circulation to humidity levels.</li>" +
                "</ul>" + "<br /> "
        }
        if (count == 0) {
            console.log("No problem");
            det.innerHTML = "<h3>Details-</h3><br><p>No Issues detected related to Sunlight Hours, Temperature or Humidity</p>";
        }
        //SARA DATA SAME HAI SARI CROPS KE LIYE ZAID ME


    }
}
// det.innerHTML +=
//     "<h4 class='added_h4'>Less Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4>" + " <br /> " +
//     "<ul class='list'>" +
//     "<li>Plant the crop earlier in the season to take advantage of cooler temperatures.</li>" +
//     "<li>Use crop varieties that are adapted to cooler temperatures.</li>" +
//     "<li>Use drip irrigation or other water-saving techniques to ensure the crop receives adequate moisture.</li>" +
//     "</ul>" + "<br /> "
// det.innerHTML +=
//     "<h4 class='added_h4'>More Temperature than required being provided to crops.</h4> <h4 class='add_solution'>Solutions-</h4>" + " <br /> " +
//     "<ul class='list'>" +
//     "<li>Plant the crop later in the season to avoid the hottest periods.</li>" +
//     "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
//     "<li>Increase the frequency of irrigation to prevent water stress and wilting.</li>" +
//     "</ul>" + "<br /> "
// det.innerHTML +=
//     "<h4 class='added_h4'>Less Sunlight Hours than  required available for crops.</h4> <h4 class='add_solution'>Solutions-</h4>" + " <br /> " +
//     "<ul class='list'>" +
//     "<li>Select crop varieties that are better adapted to low-light conditions</li>" +
//     "<li>Use reflective mulch to increase the amount of available light.</li>" +
//     "<li>Use artificial light sources, such as grow lights, to supplement natural light.</li>" +
//     "</ul>" + "<br /> "
// det.innerHTML +=
//     "<h4 class='added_h4'>More Sunlight Hours than required for crops.</h4> <h4 class='add_solution'>Solutions-</h4>" + " <br /> " +
//     "<ul class='list'>" +
//     "<li>Consider using sunscreen sprays or other protective measures to reduce sunburn damage on fruits or vegetables that are exposed to direct sunlight.</li>" +
//     "<li>Use shade cloth or other shading devices to reduce the amount of direct sunlight on the crop.</li>" +
//     "<li>Water the crop more frequently to prevent water stress and wilting.</li>" +
//     "</ul>" + "<br /> "
// det.innerHTML +=
//     "<h4 class='added_h4'>More Humidity than required provided to crops..</h4> <h4 class='add_solution'>Solutions-</h4>" + " <br /> " +
//     "<ul class='list'>" +
//     "<li>Ensure adequate drainage to prevent waterlogging and root rot.</li>" +
//     "<li>Consider using fungicides or other inputs to prevent or control fungal diseases that thrive in humid conditions.</li>" +
//     "<li>Use open-field production or other techniques that promote good air circulation and reduce humidity levels.</li>" +
//     "</ul>" + "<br /> "
// det.innerHTML +=
//     "<h4 class='added_h4'>Less Humidity than required available for crops.</h4> <h4 class='add_solution'>Solutions-</h4>" + " <br /> " +
//     "<ul class='list'>" +
//     "<li>Water the crop more frequently to compensate for the reduced amount of moisture in the air</li>" +
//     "<li>Apply foliar spray to help reduce water loss from plant leaves.</li>" +
//     "<li>Use fans or other ventilation devices to improve air circulation and reduce the risk of fungal diseases.</li>" +
//     "</ul>" + "<br /> "
