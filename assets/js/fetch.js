document.writeln("<script type='text/javascript' src='./controlElement.js'></script>");

const getWeather = async () => {
    try {
        if (lat === undefined && lng === undefined) {
            lat = 40.730610;
            lng = -73.935242;
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=45bb604b9ab63b565878da914e9f5edc&exclude=minutely,daily`)
        const data = await response.json();
        const firstTwelve = data.hourly.slice(1, 13);

        // current Weather
        let caps = data.current.weather[0].description.charAt(0).toUpperCase();
        currentWeather.textContent = caps + data.current.weather[0].description.slice(1)
        city.textContent = data.timezone;
        currentTemp.textContent = `${Math.floor(data.current.temp)}°`;
        currentWeatherImg.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
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
        twelveHours(firstTwelve);

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

};

// Get weather data on page load
getWeather();