document.writeln("<script type='text/javascript' src='./time.js'></script>");

// declare all elements
// search input
const input = document.querySelector('.search-input');
//
const currentWeather = document.querySelector('.current-weather');
const city = document.querySelector('.city');
const currentTemp = document.querySelector('.current-temp');
const currentWeatherImg = document.querySelector('.img');
//
const weatherNav = document.querySelector('#weather-nav');
const historyNav = document.querySelector('#history-nav')
const back = document.querySelector('.back');
const weatherDiv = document.querySelector('.weather');
// loader
const loader = document.querySelector('.loader');
const historyDiv = document.querySelector('.history');
// nodata
const noData = document.querySelector('.no-data'); 
const historyDetailsDiv = document.querySelector('.history-details');


weatherNav.addEventListener('click', () => {
    historyDiv.style.display = 'none';
    weatherDiv.style.display = 'block';
    weatherNav.classList.add('active');
    historyNav.classList.remove('active');
    historyDetailsDiv.style.display = 'none';

})

historyNav.addEventListener('click', () => {
    weatherDiv.style.display = 'none'
    historyDiv.style.display = 'block';
    historyNav.classList.add('active');
    weatherNav.classList.remove('active');
    historyDetailsDiv.style.display = 'none';
});


back.addEventListener('click', () => {
    back.style.display = 'none';
    weatherNav.style.display = 'block';
    historyDetailsDiv.style.display = 'none';
    historyDiv.style.display = 'block';
});


// latitude and longitude for search location.
let lat;
let lng

// display first 12 hours from search time
function twelveHours(firstTwelve) {
    // set loader to none 
    loader.style.display = 'none';
    
    firstTwelve.forEach(hourly => {

        const url = `https://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
        const temp = Math.floor(hourly.temp);
        // day and date
        const dateTime = dateFormat(hourly.dt);

        
        // loader.style.display = 'none';
        weatherDiv.innerHTML += `
            <div class="content">
                <p>
                    <span>${dateTime.time}</span>
                    <span>${dateTime.date}</span>
                </p>
                <p>
                    <span><img src=${url} alt="weather icon" width="30%"></span>
                    <span>${hourly.weather[0].description} ${temp}°</span>
                </p>
            </div>
        `
    })
}


// for history details
function singleDetail(history, id) {
    const singleData = history.filter(data => data.id == id);

    singleData[0].firstTwelve.forEach(hourly => {

        const url = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
        const temp = Math.floor(hourly.temp);
        // day and date
        const dateTime = dateFormat(hourly.dt);


        historyDetailsDiv.innerHTML += `
                <div class="content">
                    <p>
                        <span>${dateTime.time}</span>
                        <span>${dateTime.date}</span>
                    </p>
                    <p>
                        <span><img src=${url} alt="weather icon" width="30%"></span>
                        <span>${hourly.weather[0].description} ${temp}°</span>
                    </p>
                </div>
            `
    })
}


// local storage
let local = localStorage.getItem('data');
let oldLocal = JSON.parse(local);



let dataHistory = localStorage.getItem('data');
let history = JSON.parse(dataHistory);
// data history
function weatherHistory() {
    if (history !== null) {
        history.forEach(day => {
            historyDiv.innerHTML += `
        <div id="details" class="content" onclick=dataDetails(${day.id})>
            <p>
                <span>${day.currentTime.time}</span>
                <span>${day.currentTime.date}</span>
            </p>
            <p>
                <span>${day.city}</span>
                <span>${day.currentWeather} ${day.currentTemp}</span>
            </p>
        </div>
        `
        })
    }

    noData.style.display = 'block'
}

weatherHistory();


function dataDetails(id) {
    // divs
    weatherNav.style.display = 'none';
    historyDetailsDiv.style.display = 'block';
    back.style.display = 'block';
    historyDiv.style.display = 'none';

    //
    singleDetail(history, id);
}




// GET A LOCATION LATITUDE AND LONGITUDE
async function latLng(location) {
    if (!location) {
        return undefined
    }

    try {
        const response = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${location}`, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                "x-rapidapi-key": "feb5a7b223msh76b7a43e38446bfp1eb31ajsne300800cf916"
            }
        });

        const data = await response.json()
        if (data.length < 1) {
            return console.log('not found')
        }


        lat = data.results[0].geometry.location.lat,
            lng = data.results[0].geometry.location.lng
        console.log('lat', lat);
        console.log('lng', lng)
    }
    catch (e) {
        console.error(e);
    };
}

// debounce
// function debounce(func, wait = 10000) {
//     let timeout;
//     return function(...args) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         func.apply(this, args);
//       }, wait);
//     };
//   }
