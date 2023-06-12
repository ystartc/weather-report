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
  changeColor();
  changeLandscape();
  autoChangeSky();
};

const setDownTemp = () => {
  state.temp -= 1;
  displayTemp();
  changeColor();
  changeLandscape();
  autoChangeSky();
};

const changeColor = () => {
  if (state.temp < 50) {
    currentTemp.setAttribute('class', 'teal');
    //(currentTemp.style.color = 'teal')?
  } else if (state.temp < 60) {
    currentTemp.setAttribute('class', 'green');
  } else if (state.temp < 70) {
    currentTemp.setAttribute('class', 'yellow');
  } else if (state.temp < 80) {
    currentTemp.setAttribute('class', 'orange');
  } else if (state.temp >= 80) {
    currentTemp.setAttribute('class', 'red');
  }
};

const changeLandscape = () => {
  if (state.temp < 60) {
    currentLandscape.textContent = '🍂 🌲🌲 ⛄️ 🌲 ⛄️ 🍂🌲 ⛄️ 🍂 🌲';
  } else if (state.temp < 70) {
    currentLandscape.textContent = '🌾 🌾 🍃 🪨 🌾_🛤_🌾 🌾 🌾 🍃 ';
  } else if (state.temp < 80) {
    currentLandscape.textContent = '🌸 🌿 🌼 ☘️ 🌷 🌻 ☘️ 🌸 🌱 🌻 🌷';
  } else if (state.temp >= 80) {
    currentLandscape.textContent = '🌵 _🐍 _🦂_ 🌵 _🐍 _🏜 _🦂';
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
    .get('http://127.0.0.1:5000/location', {
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
    .get('http://127.0.0.1:5000/weather', {
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
    currentSky.textContent = '☀️ 🌤 ☁️ ☀️ ☀️ ☀️ ☀️ ☁️ ☀️ 🌤 ☀️';
  } else if (skyValue === 'cloudy') {
    currentSky.textContent = '☁️ 🌤 ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️ 🌤 ☁️';
  } else if (skyValue === 'rainy') {
    currentSky.textContent = '🌧 🌦 🌈 ⛈ 🌧 💧 ⛈ 🌦 💧 🌈 🌧';
  } else if (skyValue === 'snowy') {
    currentSky.textContent = '🌨 ❄️ 🌨 ❄️ ❄️ 🌨 ❄️ ❄️ 🌨 ❄️';
  } else currentSky.textContent = '';
};

const autoChangeSky = () => {
  if (state.temp < 40) selectSky('snowy');
  else if (state.temp < 50) selectSky('rainy');
  else if (state.temp < 70) selectSky('cloudy');
  else if (state.temp >= 70) selectSky('sunny');
};

const displayTemp = () => {
  currentTemp.textContent = `${state.temp}`;
  changeColor();
  changeLandscape();
  autoChangeSky();
};

displayTemp();

const registerEventHandlers = () => {
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);
  resetCityButton.addEventListener('click', () => {
    resetCity(), apiCalls();
  });
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
