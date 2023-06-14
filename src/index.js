const defaultCity = 'Seattle';
const state = { temp: '', currentCity: defaultCity };

const currentTemp = document.getElementById('current-temp');
const upButton = document.getElementById('up-temp');
const downButton = document.getElementById('down-temp');

const currentLandscape = document.getElementById('landscape-weather-visual');
const currentSky = document.getElementById('sky-weather-visual');
const skySelector = document.getElementById('sky-select');

const currentCityDisplay = document.getElementById('city');
const cityInput = document.getElementById('city-input');
const resetCityButton = document.getElementById('city-reset');

const realTimeButton = document.getElementById('real-time-button');

const dateTime = document.getElementById('date-time');
const currentDate = new Date().toUTCString();
dateTime.textContent = currentDate.slice(0, 3) + ' ' + currentDate.slice(5, 16);

const select = document.querySelector('select');

cityInput.placeholder = defaultCity;
currentCityDisplay.textContent = state.currentCity;

const setUpTemp = () => {
  state.temp += 1;
  displayTemp();
  changeColor(state.temp);
  changeLandscape(state.temp);
  autoChangeSky(state.temp);
};

const setDownTemp = () => {
  state.temp -= 1;
  displayTemp();
  changeColor(state.temp);
  changeLandscape(state.temp);
  autoChangeSky(state.temp);
};

const changeColor = temperature => {
  if (temperature < 50) {
    currentTemp.setAttribute('class', 'teal');
    //(currentTemp.style.color = 'teal')?
  } else if (temperature < 60) {
    currentTemp.setAttribute('class', 'green');
  } else if (temperature < 70) {
    currentTemp.setAttribute('class', 'yellow');
  } else if (temperature < 80) {
    currentTemp.setAttribute('class', 'orange');
  } else if (temperature >= 80) {
    currentTemp.setAttribute('class', 'red');
  }
};

const changeLandscape = temperature => {
  if (temperature < 60) {
    currentLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temperature < 70) {
    currentLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature < 80) {
    currentLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 80) {
    currentLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

const updateCityName = city => {
  if (city === '') {
    currentCityDisplay.textContent = defaultCity;
    select.value = 'default';
  } else {
    state.currentCity = city;
    currentCityDisplay.textContent = inputCaseSensitive(city);
    select.value = 'default';
  }
};

const resetCity = () => {
  updateCityName(defaultCity);
  cityInput.value = '';
};

const apiCalls = () => {
  let lat, lon;
  axios
    .get('https://git.heroku.com/demo-weather.git/location', {
      params: {
        q: currentCityDisplay.textContent,
      },
    })
    .then(response => {
      lat = response.data[0].lat;
      lon = response.data[0].lon;

      findWeather(lat, lon);
    })
    .catch(error => {
      console.log('could not retrieve location', error.data);
    });
};

const findWeather = (latitude, longitude) => {
  axios
    .get('https://git.heroku.com/demo-weather.git/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then(response => {
      console.log(response.data);
      const kelvTemp = response.data.main.temp;
      state.temp = Number(((kelvTemp - 273.15) * (9 / 5) + 32).toFixed());
      displayTemp();
    })
    .catch(error => {
      console.log('error in API Call - weather'.error.data);
    });
};

const inputCaseSensitive = city => {
  const citySplit = city.split(' ').filter(el => el !== '');

  const styleWord = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (citySplit.length === 1) {
    return styleWord(citySplit[0]);
  }

  const styledWords = citySplit.map(styleWord);
  return styledWords.join(' ');
};

const selectSky = skyValue => {
  if (skyValue === 'sunny') {
    currentSky.textContent = '☁️ ☀️ ☀️  ☀️ ☀️ ☁️';
  } else if (skyValue === 'cloudy') {
    currentSky.textContent = '☁️☁️ 🌤☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyValue === 'rainy') {
    currentSky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyValue === 'snowy') {
    currentSky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  } else currentSky.textContent = '';
};

const autoChangeSky = temperature => {
  if (temperature < 40) selectSky('snowy');
  else if (temperature < 50) selectSky('rainy');
  else if (temperature < 70) selectSky('cloudy');
  else if (temperature >= 70) selectSky('sunny');
};

const displayTemp = () => {
  currentTemp.textContent = `${state.temp}`;
  changeColor(state.temp);
  changeLandscape(state.temp);
  autoChangeSky(state.temp);
};

displayTemp();

const registerEventHandlers = () => {
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);
  resetCityButton.addEventListener('click', resetCity);
  realTimeButton.addEventListener('click', () => {
    updateCityName(cityInput.value);
    apiCalls();
  });
  cityInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      realTimeButton.click();
    }
  });
  skySelector.addEventListener('change', () => selectSky(skySelector.value));

  window.onload = event => {
    apiCalls();
    resetCity();
  };
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
