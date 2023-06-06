const currentTemp = document.getElementById('current-temp');

const displayTemp = () => {
  //how we update the displayed temp
};

const setUpTemp = () => {
  const upButton = document.getElementsById('up-temp');
};

const setDownTemp = () => {
  const downButton = document.getElementsById('down-temp');
};

//expected behavior of currentTemp as it changes
if (currentTemp < 50) {
  currentTemp.setAttribute('class', 'teal');
} //-> number and background color changes to Teal
else if (currentTemp < 60) {
  currentTemp.setAttribute('class', 'green');
} //-> number and background color changes to Green
else if (currentTemp < 70) {
  currentTemp.setAttribute('class', 'yellow');
} //-> number and background color changes to Yellow
else if (currentTemp < 80) {
  currentTemp.setAttribute('class', 'orange');
} //-> number and background color changes to Orange
else if (currentTemp >= 80) {
  currentTemp.setAttribute('class', 'orange');
}

const registerEventHandlers = () => {
  // const addCommentButton = document.getElementById('guestbook__button');
  upButton.addEventListener('click', setUpTemp);
  downButton.addEventListener('click', setDownTemp);

  //   document.getElementById('kudos__button').addEventListener('click', addKudos);

  //   document
  //     .getElementById('blue__button')
  //     .addEventListener('click', setBlueTheme);

  //   document.getElementById('red__button').addEventListener('click', setRedTheme);

  //   document
  //     .getElementById('green-button')
  //     .addEventListener('click', setGreenTheme);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
