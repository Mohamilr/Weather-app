// declare all elements
const historyNav = document.querySelector('#history-nav')
const back = document.querySelector('.back');
const historyDiv = document.querySelector('.history');
// nodata
const noData = document.querySelector('.no-data'); 
const historyDetailsDiv = document.querySelector('.history-details');


historyNav.addEventListener('click', () => {
    historyDiv.style.display = 'block';
    historyNav.classList.add('active');
    historyDetailsDiv.style.display = 'none';
});


back.addEventListener('click', () => {
    back.style.display = 'none';
    historyDetailsDiv.style.display = 'none';
    historyDiv.style.display = 'block';
});

// for history details
function singleDetail(history, id) {
    const singleData = history.filter(data => data.id == id);

    singleData[0].firstTwelve.forEach(hourly => {

        const url = `https://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
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

// format date
function dateFormat(unix) {
    const date = new Date(unix * 1000);
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();
    const year = date.getUTCFullYear();
    let month = date.getMonth();
    month += 1;
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
    historyDiv.style.display = 'block';
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
    historyDetailsDiv.style.display = 'block';
    back.style.display = 'block';
    historyDiv.style.display = 'none';

    //
    singleDetail(history, id);
}
