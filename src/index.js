const state = { temp: 75 };

const currentTemp = document.getElementById('current-temp');
const upButton = document.getElementById('up-temp');
const downButton = document.getElementById('down-temp');
const currentLandscape = document.getElementById('landscape-weather-visual');

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
    currentTemp.setAttribute('class', 'teal'); //(currentTemp.style.color = 'teal')
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
    currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  } else if (temperature < 70) {
    currentLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
  } else if (temperature < 80) {
    currentLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
  } else if (temperature >= 80) {
    currentLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
  }
};

const registerEventHandlers = () => {
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
