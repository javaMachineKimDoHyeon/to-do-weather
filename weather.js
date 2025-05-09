// weather.js

const API_KEY = '키는 알려주면 안된대';
const CITY = 'Busan';

export async function fetchWeather(weatherBox) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=kr&appid=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  weatherBox.innerHTML = `
    <h2>☁️ 날씨 정보</h2>
    <p>${data.name}, ${data.weather[0].description}</p>
    <p>${Math.round(data.main.temp)}℃</p>
  `;
}

export function showNoForecast(weatherBox) {
  weatherBox.innerHTML = `
    <h2>☁️ 날씨 정보</h2>
    <p>${CITY}의 날씨는</p>
    <p><strong>예보 준비 중이에요 ☁️</strong></p>
  `;
}
