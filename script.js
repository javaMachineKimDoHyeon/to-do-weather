// script.js
// 날씨와 할일을 분리해서 모듈화 하였음
const API_KEY = '75486a58af102f1fb237ea3b5ad2ffa4';
const CITY = 'Busan';

async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=kr&appid=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const weatherBox = document.getElementById('weather-box');

  weatherBox.innerHTML = `
    <h2>☁️ 날씨 정보</h2>
    <p>${data.name}, ${data.weather[0].description}</p>
    <p>${Math.round(data.main.temp)}℃</p>
  `;
}

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const sidebar = document.getElementById('sidebar');
const editInput = document.getElementById('edit-input');
const editBtn = document.getElementById('edit-confirm');
const deleteBtn = document.getElementById('edit-delete');
const dateDisplay = document.getElementById('selected-date-display');

let currentLi = null;
let selectedDate = null;
let todoData = {};

function saveToLocalStorage() {
  localStorage.setItem('todo-data', JSON.stringify(todoData));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('todo-data');
  if (saved) {
    todoData = JSON.parse(saved);
  }
}

function renderTodos() {
  todoList.innerHTML = '';
  if (!selectedDate || !todoData[selectedDate]) return;
  todoData[selectedDate].forEach((item, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    const span = document.createElement('span');
    span.textContent = item.text;
    span.style.marginLeft = '8px';
    if (item.done) span.classList.add('done');
    checkbox.addEventListener('change', function () {
      item.done = checkbox.checked;
      span.classList.toggle('done', checkbox.checked);
      saveToLocalStorage();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.addEventListener('click', function () {
      currentLi = li;
      editInput.value = item.text;
      sidebar.classList.add('active');
      currentLi.dataset.index = index;
    });
    todoList.appendChild(li);
  });
}

addBtn.addEventListener('click', function () {
  const value = input.value.trim();
  if (value === '' || !selectedDate) {
    alert('날짜를 선택하고, 할 일을 입력해 주세요!');
    return;
  }
  if (!todoData[selectedDate]) todoData[selectedDate] = [];
  todoData[selectedDate].push({ text: value, done: false });
  input.value = '';
  saveToLocalStorage();
  renderTodos();
});

editBtn.addEventListener('click', function () {
  if (currentLi && selectedDate) {
    const index = currentLi.dataset.index;
    todoData[selectedDate][index].text = editInput.value.trim();
    sidebar.classList.remove('active');
    saveToLocalStorage();
    renderTodos();
  }
});

deleteBtn.addEventListener('click', function () {
  if (currentLi && selectedDate) {
    const index = currentLi.dataset.index;
    todoData[selectedDate].splice(index, 1);
    sidebar.classList.remove('active');
    saveToLocalStorage();
    renderTodos();
  }
});

flatpickr("#date-picker", {
  dateFormat: "Y-m-d",
  defaultDate: new Date(),
  onChange: function (selectedDates, dateStr) {
    selectedDate = dateStr;
    dateDisplay.textContent = selectedDate;
    renderTodos();

    const today = new Date();
    const selected = new Date(dateStr);

    const isToday =
      today.getFullYear() === selected.getFullYear() &&
      today.getMonth() === selected.getMonth() &&
      today.getDate() === selected.getDate();

    const weatherBox = document.getElementById('weather-box');

    if (isToday) {
      fetchWeather();
    } else {
      weatherBox.innerHTML = `
        <h2>☁️ 날씨 정보</h2>
        <p>${CITY}의 날씨는</p>
        <p><strong>예보 준비 중이에요 ☁️</strong></p>
      `;
    }
  }
});

loadFromLocalStorage();
fetchWeather();
