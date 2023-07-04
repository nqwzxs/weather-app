const searchLocationForm = document.querySelector('form');

searchLocationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.querySelector('input');
  const location = input.value;

  const weatherData = await getWeatherData(location);
  updateWeatherCard(weatherData);
});

async function getWeatherData(location) {
  const apiKey = 'c8360e2b8d134939891121004232706';
  const url = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=$' + location;
  const response = await fetch(url);
  
  if (response.status === 200) {
    return response.json();
  }
}

async function getGif(search) {
  const apiKey = 'AIzaSyBPMeUcdifnjv8NE9f_T-JJrJRLwIWYf4A';
  const url = "https://tenor.googleapis.com/v2/search?q=" + `weather_${search}` + "&key=" + apiKey;
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    const gifs = data.results;
    
    const gif = gifs[Math.floor(Math.random() * gifs.length)];
    const gifUrl = gif.media_formats.gif.url;

    console.log(gifUrl);
  }
}

function updateWeatherCard(data) {
  const location = document.querySelector('.location');
  const temperature = document.querySelector('.temperature');
  const condition = document.querySelector('.condition');

  location.textContent = `${data.location.name}, ${data.location.country}`;
  temperature.textContent = `${data.current.temp_c}°C`;
  condition.textContent = data.current.condition.text;
}