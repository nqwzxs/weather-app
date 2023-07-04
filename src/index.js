const background = document.querySelector('.background');
const weatherCard = document.querySelector('.weather-card');

const loadingIcon = document.querySelector('svg');

const location = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.condition');

const searchLocationForm = document.querySelector('form');

const settingsButton = document.querySelector('.settings-button');
const settingsModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const darkMode = document.querySelector('.dark-mode');
const scale = document.querySelector('.scale');

let tempMode = scale.value;

settingsButton.addEventListener('click', (e) => {
  settingsModal.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
  settingsModal.classList.remove('active');
  overlay.classList.remove('active');
});

scale.addEventListener('change', (e) => {
  tempMode = scale.value;
});

darkMode.addEventListener('change', (e) => {
  if (darkMode.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});

searchLocationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  clearWeatherCard();
  background.style['background-color'] = 'rgba(0, 0, 0, 0.5)';
  loadingIcon.style.visibility = 'visible';

  const input = document.querySelector('input');
  const location = input.value;

  const weatherData = await getWeatherData(location);

  background.style['background-color'] = ''
  loadingIcon.style.visibility = 'hidden';

  if (weatherData.current) {
    updateWeatherCard(weatherData);
    setBackgroundGif(weatherData.current.condition.text);
  } else {
    displayError(weatherData.error.message);
  }
});

async function getWeatherData(location) {
  const apiKey = 'c8360e2b8d134939891121004232706';
  const url = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=$' + location;
  const response = await fetch(url);
  
  return response.json();
}

async function getGifUrl(search) {
  const apiKey = 'AIzaSyBPMeUcdifnjv8NE9f_T-JJrJRLwIWYf4A';
  const url = 'https://tenor.googleapis.com/v2/search?q=' + search + '&key=' + apiKey;
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const gifs = data.results;
    
    const gif = gifs[Math.floor(Math.random() * gifs.length)];
    const gifUrl = gif.media_formats.gif.url;

    return gifUrl;
  }
}

function updateWeatherCard(data) {
  location.textContent = `${data.location.name}, ${data.location.country}`;
  temperature.textContent = tempMode === 'celsius' ? data.current.temp_c + '°C' : data.current.temp_f + '°F';
  condition.textContent = data.current.condition.text;
}

function clearWeatherCard(data) {
  location.textContent = '';
  temperature.textContent = '';
  condition.textContent = '';

  background.style['background-image'] = '';
}

async function setBackgroundGif(condition) {
  const gifUrl = await getGifUrl('weather ' + condition);

  background.style['background-image'] = `url(${gifUrl})`;
}

function displayError(message) {
  clearWeatherCard();

  location.textContent = message;
}