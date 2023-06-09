const state = { temp: 75 };

const currentTemp = document.getElementById('current-temp');
const upButton = document.getElementById('up-temp');
const downButton = document.getElementById('down-temp');
const currentLandscape = document.getElementById('landscape-weather-visual');
const currentCityDisplay = document.getElementById('city');
const newCityInput = document.getElementById('city-input');
const resetCityButton = document.getElementById('city-reset');
const realTimeButton = document.getElementById('real-time-button');

const displayTemp = () => {
  currentTemp.textContent = `${state.temp}`;
  changeColor(state.temp);
};

const setUpTemp = () => {
  state.temp += 1;
  displayTemp();
  changeColor(state.temp);
  changeLandscape(state.temp);
};

const setDownTemp = () => {
  state.temp -= 1;
  displayTemp();
  changeColor(state.temp);
  changeLandscape(state.temp);
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

displayTemp();

const updateCityName = () => {
  currentCityDisplay.textContent = inputCaseSensitive(newCityInput.value);
  // const city = newCityInput.value.trim();
  // currentCityDisplay.textContent =
  //   city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
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
      state.temp = Number((((kelvTemp - 273.15) * 9) / 5 + 32).toFixed());
      displayTemp();
    })
    .catch(error => {
      console.log('error in API Call - weather'.error.data);
    });
};

const inputCaseSensitive = city => {
  const citySplit = city.split(' ');

  const styleWord = word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (citySplit.length === 1) {
    return styleWord(citySplit[0]);
  }

  const styledWords = citySplit.map(styleWord);
  return styledWords.join(' ');
};

const registerEventHandlers = () => {
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);
  resetCityButton.addEventListener('click', updateCityName);
  realTimeButton.addEventListener('click', apiCalls);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
