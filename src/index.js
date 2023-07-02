async function getWeatherData(location) {
  const url = `http://api.weatherapi.com/v1/current.json?key=c8360e2b8d134939891121004232706&q=${location}`;
  const response = await fetch(url);
  const weatherData = await response.json();
  console.log(weatherData);
}

getWeatherData('london')