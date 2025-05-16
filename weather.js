// weather.js

// OpenWeatherMap API 키 (개인 발급 받은 값)
const API_KEY = '키는 알려주면 안된대';
// 날씨 정보를 가져올 도시 이름 (현재는 고정값 'Busan')
const CITY = 'Busan';

export async function fetchWeather(weatherBox) {
  // API 호출 URL 구성 (도시, 언어, 섭씨단위 포함)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=kr&appid=${API_KEY}`;
  // fetch 요청 → 응답 받기
  const res = await fetch(url);
  // 응답을 JSON 형식으로 파싱
  const data = await res.json();

  // 날씨 정보를 HTML로 표시
  weatherBox.innerHTML = `
    <h2>☁️ 날씨 정보</h2>
    <p>${data.name}, ${data.weather[0].description}</p>
    <p>${Math.round(data.main.temp)}℃</p>
  `;
}

  // 오늘이 아닌 날짜를 선택했을 때 보여줄 안내 메시지
export function showNoForecast(weatherBox) {
  // 예보가 준비되지 않았다는 메시지 출력
  weatherBox.innerHTML = `
    <h2>☁️ 날씨 정보</h2>
    <p>${CITY}의 날씨는</p>
    <p><strong>예보 준비 중이에요 ☁️</strong></p>
  `;
}

// export는 다른 파일(script.js)에서 이 함수들을 불러오기 위해 필요
