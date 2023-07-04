const weatherCard = document.querySelector('.weather-card');  

const location = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.condition');

const searchLocationForm = document.querySelector('form');

searchLocationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.querySelector('input');
  const location = input.value;

  const weatherData = await getWeatherData(location);

  if (weatherData.current) {
    updateWeatherCard(weatherData);
    setBackgroundGif(weatherData.current.condition.text);
  } else {
    displayError(weatherData.error.message);
  }
});

async function getWeatherData(location) {
  const apiKey = 'c8360e2b8d134939891121004232706';
  const url = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=$' + location;
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
  temperature.textContent = `${data.current.temp_c}°C`;
  condition.textContent = data.current.condition.text;
}

async function setBackgroundGif(condition) {
  const gifUrl = await getGifUrl('weather ' + condition);

  weatherCard.style['background-image'] = `url(${gifUrl})`;
}

function displayError(message) {
  location.textContent = message;

  temperature.textContent = '';
  condition.textContent = '';
  weatherCard.style['background-image'] = ``;
}