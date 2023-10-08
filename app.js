
// get all nessecary Elements for DOM
let API = "59a087918d987252bfa01858fb687995"

let app = document.querySelector('.weather_app')

let temp = document.querySelector('.temp')

let dateOutput = document.querySelector('.date')

let timeOutput = document.querySelector('.time')

let conditionOutput = document.querySelector('.condition')

let nameOutput = document.querySelector('.name')

let icon = document.querySelector('.icon')

let cloudOutput = document.querySelector('.cloud')

let humidityOutput = document.querySelector('.humidity')

let windOutput = document.querySelector('.wind')

let form = document.querySelector('#locationInput')

let btn = document.querySelector('.submit')

let search = document.querySelector('.search')

let cities = document.querySelectorAll('.city')

// add click event on cities

// get location

let cityInput = "karachi";


// console.log(cities);

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // changed defulte cities on click
        cityInput = e.target.innerHTML
        // function that dusplays all data from api {we will create soon}
        fetchWeatherData();
    })
})


// add submit event to the form

form.addEventListener('submit', (e) => {
    // if input is empty
    if (search.value) {
        alert("pleas type the city name---")
        app.style.opacity = 0;
    }
    else {

        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = 1;
    }
    e.preventDefault()
})


function dayOfWeek(day, month, year) {
    const weekDay = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ]
    return weekDay[new Date(`${day}/${month}/${year}`).getDay()]
}

// function that diplyas fetches data from api

function fetchWeatherData(e) {
    // fetch the data with  api and dinamically add city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API}`)
        // take the data and  into jason and convert it into JsObject
        .then(response => response.json())
        .then(data => {
            // console.log(data);
                if(search.value.lenght !== 0){

                    temp.innerHTML = data.main.temp + '&#176'
                    conditionOutput.innerHTML = data.weather[0].description
                    cloudOutput.innerHTML = data.clouds.all + "%";
                    humidityOutput.innerHTML = data.main.humidity + "%";
                    windOutput.innerHTML = data.wind.speed + "km/h";
                    
                    let date = data.timezone
                    
                    nameOutput.innerHTML = data.name
                    
                }
                else{
                    alert("an input is empty")
                }
            // here we set time from setTimeFun 
            // const iconId = data.weather[0].icon.substr(
            //     '//cdn.weatherapi.com/weather/64x64/'.length
            // );
            // console.log(iconId);
            // console.log(data.clouds.all);


        })
        .catch((err)=>{
            alert("an error occur",err)
            throw new Error('there is a problem') 
        })
}
