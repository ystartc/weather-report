const state = { temp: 75 };
const currentTemp = document.getElementById('current-temp');

const displayTemp = () => {
  currentTemp.textContent = `${state.temp}`;
};

const upButton = document.getElementById('up-temp');
const downButton = document.getElementById('down-temp');

const setUpTemp = () => {
  state.temp += 1;
  displayTemp();
  changeColor(state.temp);
};

const setDownTemp = () => {
  state.temp -= 1;
  displayTemp();
  changeColor(state.temp);
};

const changeColor = function (temprature) {
  if (temprature < 50) {
    currentTemp.setAttribute('class', 'teal'); //(currentTemp.style.color = 'teal')
  } else if (temprature < 60) {
    currentTemp.setAttribute('class', 'green');
  } else if (temprature < 70) {
    currentTemp.setAttribute('class', 'yellow');
  } else if (temprature < 80) {
    currentTemp.setAttribute('class', 'orange');
  } else if (temprature >= 80) {
    currentTemp.setAttribute('class', 'red');
  }
};

const registerEventHandlers = () => {
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
