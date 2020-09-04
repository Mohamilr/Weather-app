// declare all elements
const currentWeather = document.querySelector('.current-weather');
const city = document.querySelector('.city');
const currentTemp = document.querySelector('.current-temp');
//
const weatherNav = document.querySelector('#weather-nav');
const historyNav = document.querySelector('#history-nav')
const back = document.querySelector('.back');
const weatherDiv = document.querySelector('.weather');
const historyDiv = document.querySelector('.history');
const historyDetailsDiv = document.querySelector('.history-details');
const details = document.querySelector('#details');

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


details.addEventListener('click', () => {
    weatherNav.style.display = 'none';
    historyDetailsDiv.style.display = 'block';
    back.style.display = 'block';
    historyDiv.style.display = 'none';
});

back.addEventListener('click', () => {
    back.style.display = 'none';
    weatherNav.style.display = 'block';
    historyDetailsDiv.style.display = 'none';
    historyDiv.style.display = 'block';
});




const fetchD = document.querySelector('#fetch');


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
        

        firstTwelve.forEach(hourly => {
            const url = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
            const temp = Math.floor(hourly.temp);
            // day and date
            const dateTime = dateFormat(hourly.dt);

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
        console.log('fi', firstTwelve)
        console.log(data)
    }
    catch (e) {
        console.error(e)
    }

})

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
