// declare all elements
const currentWeather = document.querySelector('.current-weather');
const city = document.querySelector('.city');
const currentTemp = document.querySelector('.current-temp');
const currentWeatherImg = document.querySelector('.img');
//
const weatherNav = document.querySelector('#weather-nav');
const historyNav = document.querySelector('#history-nav')
const back = document.querySelector('.back');
const weatherDiv = document.querySelector('.weather');
const historyDiv = document.querySelector('.history');
const historyDetailsDiv = document.querySelector('.history-details');


weatherNav.addEventListener('click', () => {
    historyDiv.style.display = 'none';
    weatherDiv.style.display = 'block';
    historyDetailsDiv.style.display = 'none';

})

historyNav.addEventListener('click', () => {
    weatherDiv.style.display = 'none'
    historyDiv.style.display = 'block';
    historyDetailsDiv.style.display = 'none';
});


back.addEventListener('click', () => {
    back.style.display = 'none';
    weatherNav.style.display = 'block';
    historyDetailsDiv.style.display = 'none';
    historyDiv.style.display = 'block';
});


// display first 12 hours from search time
function twelveHours(firstTwelve, action) {

    switch (action) {
        case 'weather-div':
            action = weatherDiv;
            break;
        case 'history-details-div':
            action = historyDetailsDiv;
            break;
        default:
            weatherDiv;
    };

    firstTwelve.forEach(hourly => {

        const url = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
        const temp = Math.floor(hourly.temp);
        // day and date
        const dateTime = dateFormat(hourly.dt);

        action.innerHTML += `
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


const fetchD = document.querySelector('#fetch');

// local storage
let local = localStorage.getItem('data');
let oldLocal = JSON.parse(local);

fetchD.addEventListener('click', async () => {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=40.730610&lon=-73.935242&units=metric&appid=45bb604b9ab63b565878da914e9f5edc&exclude=minutely,daily')
        const data = await response.json();
        const firstTwelve = data.hourly.slice(1, 13);

        // current Weather
        let caps = data.current.weather[0].description.charAt(0).toUpperCase();
        currentWeather.textContent = caps + data.current.weather[0].description.slice(1)
        city.textContent = data.timezone;
        currentTemp.textContent = `${Math.floor(data.current.temp)}°`;
        currentWeatherImg.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
        let id = 1;
        // local storage data

        const storage = [];
        // local storage save
        if (oldLocal !== null) {
            id = oldLocal.length + 1
        }
        const store = {
            id,
            currentWeather: caps + data.current.weather[0].description.slice(1),
            city: data.timezone,
            currentTime: dateFormat(data.current.dt),
            currentTemp: `${Math.floor(data.current.temp)}°`,
            firstTwelve
        }

        storage.push(store);
        // call first 12 fuction
        twelveHours(firstTwelve, 'weather-div');

        console.log('fi', firstTwelve)
        console.log(data)


        // update localstorage content
        // let local = localStorage.getItem('data');

        if (local === null) {
            localStorage.setItem('data', JSON.stringify(storage))
        }
        else {
            // let oldLocal = JSON.parse(local);
            let newLocal = oldLocal;
            newLocal.push(store);
            localStorage.setItem('data', JSON.stringify(newLocal))
        }


    }
    catch (e) {
        console.error(e)
    }

})

// format date
function dateFormat(unix) {
    const date = new Date(unix * 1000);
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();
    const year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate();

    if (month < 10) {
        month = `0${month}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    if (hour < 10) {
        hour = `0${hour}`
    }

    if (minute < 10) {
        minute = `0${minute}`
    }

    let time;
    if (hour <= 12) {
        time = `${hour}:${minute} am`

    }
    else {
        time = `${hour}:${minute} pm`
    }

    const dateTime = {
        date: `${year}-${month}-${day}`,
        time: time
    }
    return dateTime;
}

let dataHistory = localStorage.getItem('data');
let history = JSON.parse(dataHistory);
// data history
function weatherHistory() {
    if (history !== null) {
        history.forEach(day => {
            historyDiv.innerHTML += `
        <div id="details" class="content">
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

    const details = document.querySelectorAll('#details');

    details.forEach(detail => {
        detail.addEventListener('click', () => {
            weatherNav.style.display = 'none';
            historyDetailsDiv.style.display = 'block';
            back.style.display = 'block';
            historyDiv.style.display = 'none';
            dataDetails();
        });

    })

    console.log('jjj', history)
}

weatherHistory();


function dataDetails() {
    history.forEach(detail => {
        // call first 12 fuction
        twelveHours(detail.firstTwelve, 'history-details-div');
    })
}


