// script.js

// 기능 모듈 import
import {
    loadFromLocalStorage,
    saveToLocalStorage,
    renderTodos,
    addTodo,
    editTodo,
    deleteTodo,
    setSelectedDate
  } from './todos.js';
  
  import {
    fetchWeather,
    showNoForecast
  } from './weather.js';
  
  // 주요 DOM 요소 불러오기
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const sidebar = document.getElementById('sidebar');
  const editInput = document.getElementById('edit-input');
  const editBtn = document.getElementById('edit-confirm');
  const deleteBtn = document.getElementById('edit-delete');
  const dateDisplay = document.getElementById('selected-date-display');
  const weatherBox = document.getElementById('weather-box');
  
  // 새로운 할 일 등록 이벤트
  addBtn.addEventListener('click', function () {
    const value = input.value.trim();
    if (value === '') {
      alert('할 일을 입력해 주세요!');
      return;
    }
    addTodo(value); // 새 할 일 추가
    input.value = ''; // 입력창 비우기
    renderTodos(todoList, sidebar, editInput); // 목록 다시 그리기
  });
  
  // 수정 버튼 이벤트
  editBtn.addEventListener('click', function () {
    editTodo(editInput, sidebar); // 현재 항목 수정
    renderTodos(todoList, sidebar, editInput); // 목록 갱신
  });

  // 삭제 버튼 이벤트
  deleteBtn.addEventListener('click', function () {
    deleteTodo(sidebar); // 항목 삭제
    renderTodos(todoList, sidebar, editInput); // 목록 갱신
  });
  
  flatpickr("#date-picker", {
    dateFormat: "Y-m-d", // 날짜 형식
    defaultDate: new Date(), // 초기 날짜
    onChange: function (selectedDates, dateStr) {
      setSelectedDate(dateStr); // 선택된 날짜 저장
      dateDisplay.textContent = dateStr; // UI에 표시
      renderTodos(todoList, sidebar, editInput); // 해당 날짜 할 일 그리기
  
      const today = new Date();
      const selected = new Date(dateStr);
      const isToday =
        today.getFullYear() === selected.getFullYear() &&
        today.getMonth() === selected.getMonth() &&
        today.getDate() === selected.getDate();
  
      if (isToday) {
        fetchWeather(weatherBox); // 실시간 날씨
      } else {
        showNoForecast(weatherBox); // 예보 준비중 표시
      }
    }
  });
  
  // 초기 데이터 로딩
  loadFromLocalStorage(); // 로컬스토리지에서 데이터 복원
  fetchWeather(weatherBox); // 페이지 로드 시 날짜도 표시
  
