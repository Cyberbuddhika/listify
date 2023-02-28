"use strict";

// Updating Greteing message greeting image according to system time
const greetingMessage = document.querySelector(".greeing-h1");
const imageContainer = document.querySelector(".greet-image");
const now = new Date();
const currentHour = now.getHours();

if (currentHour >= 0 && currentHour < 12) {
  imageContainer.src = "/images/shine-young-woman-meditating-at-home-1.png";
  greetingMessage.textContent = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 16) {
  imageContainer.src =
    "/images/shine-hr-manager-is-searching-for-a-resume-of-employee-1.png";
  greetingMessage.textContent = "Good Afternoon!";
} else if (currentHour >= 16 && currentHour < 19) {
  imageContainer.src = "/images/shine-friends-drinking-coffee-in-a-cafe.png";
  greetingMessage.textContent = "Good Evening!";
} else {
  imageContainer.src =
    "/images/shine-young-woman-sitting-near-the-fireplace-with-a-cat-1.png";
  greetingMessage.textContent = "Good Night!";
}

// showing new task add model when add button clicked

const modal = document.querySelector(".overlay");
const btnCloseModal = document.getElementById("close-modal-btn");
const btnOpenModal = document.querySelector(".add-button");

const openModal = function () {
  modal.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
};

const deleteBtnChange = function () {
  deleteButton.classList.toggle("delete-button-clicked");
};

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

// closing modal when escape key press

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Get the task list element from HTML
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the input element and its value
  const newTaskInput = document.getElementById("new-task-input");
  const newTaskText = newTaskInput.value.trim();

  // Only add the task if the input field is not empty
  if (newTaskText) {
    // Create a new task object with a random ID and completed status false
    const newTask = {
      id: Math.floor(Math.random() * 1000000),
      text: newTaskText,
      completed: false,
    };

    // Add the new task to local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Add the new task to the task list in HTML
    const taskListItem = document.createElement("li");
    taskListItem.innerHTML = `
        <input type="checkbox" id="${newTask.id}" class="task-checkbox" />
        <label for="${newTask.id}" class="task-text">${newTask.text}</label>
        <button class="delete-button"><img src="'/images/icons8-waste-48.png'" alt='Delete'></button>
      `;
    taskList.appendChild(taskListItem);

    // Add event listener to delete button
    const deleteButton = taskListItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      taskListItem.remove();
      updateLocalStorage();
    });

    // Reset the input field value
    newTaskInput.value = "";
  }
}

// Function to delete checked tasks
function deleteCheckedTasks() {
  // Get all the checked checkboxes
  const checkedCheckboxes = document.querySelectorAll(".task-checkbox:checked");

  // Loop through the checked checkboxes and remove their parent li element
  checkedCheckboxes.forEach((checkbox) => {
    const taskListItem = checkbox.closest("li");
    taskListItem.remove();
    updateLocalStorage();
  });
}

// Add event listener to delete button
const deleteButton = document.querySelector(".delete-button");
deleteButton.addEventListener("click", deleteCheckedTasks);

// Event listener to add a new task when the form is submitted
const addTaskForm = document.querySelector("form");
addTaskForm.addEventListener("submit", addTask);

// Function to display tasks from local storage on page load
function displayTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskListItem = document.createElement("li");
    taskListItem.innerHTML = `
      <input type="checkbox" id="${task.id}" class="task-checkbox" ${
      task.completed ? "checked" : ""
    } />
      <label for="${task.id}" class="task-text">${task.text}</label>
    `;
    taskList.appendChild(taskListItem);
  });
}

function updateLocalStorage() {
  // Get all the task items from the DOM
  const taskItems = taskList.querySelectorAll("li");

  // Create a new array of task objects from the task items
  const tasks = Array.from(taskItems).map((taskItem) => {
    const checkbox = taskItem.querySelector(".task-checkbox");
    const id = checkbox.getAttribute("id");
    const text = taskItem.querySelector(".task-text").textContent;
    const completed = checkbox.checked;
    return { id, text, completed };
  });

  // Update the tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to delete checked tasks
function deleteCheckedTasks() {
  // Get all the checked checkboxes
  const checkedCheckboxes = document.querySelectorAll(".task-checkbox:checked");

  // Loop through the checked checkboxes and remove their parent li element
  checkedCheckboxes.forEach((checkbox) => {
    const taskListItem = checkbox.closest("li");
    const taskId = checkbox.getAttribute("id");

    // Remove the task from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskListItem.remove();
  });

  // Update the tasks in local storage
  updateLocalStorage();
}

// Call the displayTasks function on page load
displayTasks();

// changing normal font to strike when checked in tasks
const checkboxes = document.querySelectorAll(".task-checkbox");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const taskListItem = checkbox.closest("li");
    taskListItem.classList.toggle("strike");
    updateLocalStorage();
  });
});
