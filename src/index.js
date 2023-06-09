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
  // changeColor(state.temp);
  // ^^^ Unsure why this does not work
};

displayTemp();

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

const changeColor = function (temperature) {
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

const changeLandscape = function (temperature) {
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

const updateCityName = () => {
  currentCityDisplay.textContent = newCityInput.value;
};

/*
const APICalls = (currentCityDisplay) => {
  axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: currentCityDisplay.textContent,
    }
  })
  .then(response => {
    axios.get('http://127.0.0.1:5000/weather', {
      params: {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      }
      .then(response => {
        const kelvTemp = response.data[0].current.temp;
        state.temp = (kelvTemp - 273.15) * 9/5 + 32
      })
      .catch(error => {
        console.log('error in API Call - weather')
      })
    })
  })
  .catch(error => {
    console.log('error in API Call')
  })
};
*/

const registerEventHandlers = () => {
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);
  resetCityButton.addEventListener('click', updateCityName);
  // realTimeButton.addEventListener('click', APICalls);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
