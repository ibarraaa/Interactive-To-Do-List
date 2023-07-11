// Get necessary DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to render tasks
const renderTasks = () => {
  // Clear the task list
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    });

    listItem.appendChild(deleteButton);

    listItem.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasksToLocalStorage();
      renderTasks();
    });

    taskList.appendChild(listItem);
  });
};

// Add task
const addTask = (title) => {
  const task = {
    title: title,
    completed: false,
  };

  tasks.push(task);
  saveTasksToLocalStorage();
  renderTasks();
};

// Handle form submission
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== '') {
    addTask(taskTitle);
    taskInput.value = '';
    taskInput.focus();
  }
});

// Initial render
renderTasks();
