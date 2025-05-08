// todos.js

let todoData = {};
let selectedDate = null;
let currentLi = null;

export function setSelectedDate(date) {
  selectedDate = date;
}

export function getSelectedDate() {
  return selectedDate;
}

export function loadFromLocalStorage() {
  const saved = localStorage.getItem('todo-data');
  if (saved) {
    todoData = JSON.parse(saved);
  }
}

export function saveToLocalStorage() {
  localStorage.setItem('todo-data', JSON.stringify(todoData));
}

export function renderTodos(todoList, sidebar, editInput) {
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

    checkbox.addEventListener('change', () => {
      item.done = checkbox.checked;
      span.classList.toggle('done', checkbox.checked);
      saveToLocalStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.addEventListener('click', () => {
      currentLi = li;
      editInput.value = item.text;
      sidebar.classList.add('active');
      currentLi.dataset.index = index;
    });

    todoList.appendChild(li);
  });
}

export function addTodo(value) {
  if (!todoData[selectedDate]) todoData[selectedDate] = [];
  todoData[selectedDate].push({ text: value, done: false });
  saveToLocalStorage();
}

export function editTodo(editInput, sidebar) {
  if (currentLi && selectedDate) {
    const index = currentLi.dataset.index;
    todoData[selectedDate][index].text = editInput.value.trim();
    sidebar.classList.remove('active');
    saveToLocalStorage();
  }
}

export function deleteTodo(sidebar) {
  if (currentLi && selectedDate) {
    const index = currentLi.dataset.index;
    todoData[selectedDate].splice(index, 1);
    sidebar.classList.remove('active');
    saveToLocalStorage();
  }
}
