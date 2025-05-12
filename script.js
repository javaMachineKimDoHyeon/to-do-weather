// script.js
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
  
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const sidebar = document.getElementById('sidebar');
  const editInput = document.getElementById('edit-input');
  const editBtn = document.getElementById('edit-confirm');
  const deleteBtn = document.getElementById('edit-delete');
  const dateDisplay = document.getElementById('selected-date-display');
  const weatherBox = document.getElementById('weather-box');
  
  addBtn.addEventListener('click', function () {
    const value = input.value.trim();
    if (value === '') {
      alert('할 일을 입력해 주세요!');
      return;
    }
    addTodo(value);
    input.value = '';
    renderTodos(todoList, sidebar, editInput);
  });
  
  editBtn.addEventListener('click', function () {
    editTodo(editInput, sidebar);
    renderTodos(todoList, sidebar, editInput);
  });
  
  deleteBtn.addEventListener('click', function () {
    deleteTodo(sidebar);
    renderTodos(todoList, sidebar, editInput);
  });
  
  flatpickr("#date-picker", {
    dateFormat: "Y-m-d",
    defaultDate: new Date(),
    onChange: function (selectedDates, dateStr) {
      setSelectedDate(dateStr);
      dateDisplay.textContent = dateStr;
      renderTodos(todoList, sidebar, editInput);
  
      const today = new Date();
      const selected = new Date(dateStr);
      const isToday =
        today.getFullYear() === selected.getFullYear() &&
        today.getMonth() === selected.getMonth() &&
        today.getDate() === selected.getDate();
  
      if (isToday) {
        fetchWeather(weatherBox);
      } else {
        showNoForecast(weatherBox);
      }
    }
  });
  
  loadFromLocalStorage();
  fetchWeather(weatherBox);
  
