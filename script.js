"use strict";

//----------- Automating Greetings --------------------------------------

// Get the greeting message and image container elements from HTML
const greetingMessage = document.querySelector(".greeing-h1");
const imageContainer = document.querySelector(".greet-image");
// Get the current system time
const now = new Date();
const currentHour = now.getHours();
// Update the greeting message and image according to the current time
if (currentHour >= 0 && currentHour < 4) {
  imageContainer.src =
    "/images/shine-girl-in-a-green-jacket-with-an-orange-scarf-and-hat.png";
  greetingMessage.textContent = "Still Awake?";
} else if (currentHour >= 4 && currentHour < 12) {
  imageContainer.src = "/images/shine-young-woman-meditating-at-home-1.png";
  greetingMessage.textContent = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 16) {
  imageContainer.src = "/images/shine-girl-writing-in-a-notebook.png";
  greetingMessage.textContent = "Good Afternoon!";
} else if (currentHour >= 16 && currentHour < 19) {
  imageContainer.src = "/images/shine-friends-drinking-coffee-in-a-cafe.png";
  greetingMessage.textContent = "Good Evening!";
} else {
  imageContainer.src =
    "/images/shine-young-woman-sitting-near-the-fireplace-with-a-cat-1.png";
  greetingMessage.textContent = "Good Night!";
}

// Showing the date
const today = document.getElementById("today");
const dayName = document.getElementById("date");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const day = now.getDay();
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();

today.innerHTML = `Today's ${days[day]}`;
dayName.innerHTML = `${months[month]} ${date}, ${year}`;


//--------------------------------------------------------------------------------




//--------------------------- OTHER FUNCTIONS ------------------------------------

//----------- Function to show or hide empty tasks message ------------------

// Get the container for the no tasks message and the image to show when no tasks
const noTasksContainer = document.querySelector(".no-task-greetings");
// const noTasksImage = document.querySelector(".no-task-greetings img");

// Get the task list element from HTML
const taskList = document.getElementById("task-list");

// Function to show/hide the no tasks message
function showNoTasksMessage() {
  if (taskList.children.length !== 0) {
    noTasksContainer.classList.add("hidden");
    // noTasksImage.classList.add("hidden");
  } else {
    noTasksContainer.classList.remove("hidden");
    // noTasksImage.classList.remove("hidden");
  }
}
//---------------------------------------------------------------------------------



//----------- Function to show or hide task input overlay modal ------------------

// Get the modal, close button, and open button elements from HTML
const modal = document.querySelector(".overlay");
const btnCloseModal = document.getElementById("close-modal-btn");
const btnOpenModal = document.querySelector(".add-button");

// Open the modal when the open button is clicked
const openModal = function (e) {
  e.stopPropagation(); // Stop the event from propagating to parent elements
  modal.classList.remove("hidden");
};

// Close the modal when the close button is clicked
const closeModal = function () {
  modal.classList.add("hidden");
  window.location.reload(true);
};

// Close the modal when the escape key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Close the modal when clicked outside the form
document.addEventListener('click', function(e) {
   // If the clicked target is the modal itself (outside the form) and the modal is currently visible
   if (e.target === modal && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Add event listeners for opening and closing the modal
btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

//---------------------------------------------------------------------------------



//----------- Functions related to Delete button ------------------------------------

// Change the style of the delete button when it is clicked
const deleteBtnChange = function () {
  deleteButton.classList.toggle("delete-button-clicked");
};


// Add event listener to delete button
const deleteButton = document.querySelector(".delete-button");
deleteButton.addEventListener("click", deleteCheckedTasks);

//---------------------------------------------------------------------------------




//----------- Functions related to Local Storage ------------------------------------

// Function to display tasks from local storage on page load
function displayTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskListItem = document.createElement("li");
    if (task.striked) {
      taskListItem.classList.add("strike");
    }
    taskListItem.innerHTML = `
      <input type="checkbox" id="${task.id}" class="task-checkbox" ${
      task.completed ? "checked" : ""
    } />
      <label for="${task.id}" class="task-text">${task.text}</label>
    `;
    taskList.appendChild(taskListItem);
  });
}


// Function to update local storage
function updateLocalStorage() {
  // Get all the task items from the DOM
  const taskItems = taskList.querySelectorAll("li");

  // Create a new array of task objects from the task items
  const tasks = Array.from(taskItems).map((taskItem) => {
    const checkbox = taskItem.querySelector(".task-checkbox");
    const id = checkbox.getAttribute("id");
    const text = taskItem.querySelector(".task-text").textContent;
    const completed = checkbox.checked; 
    const striked = taskItem.classList.contains("strike");
    return { id, text, completed, striked };
  });

  // Update the tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//---------------------------------------------------------------------------------


//-------------------- ADDING NEW TASKS -------------------------------------------


// Function to add a new task to the task list
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
      striked: false,
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
        <button class="delete-button"><img src="/images/icons8-waste-48.png" alt='Delete'></button>
      `;
    taskList.appendChild(taskListItem);

    // Displaying tasks as strikethrough font when checked 
    const newCheckbox = taskListItem.querySelector(".task-checkbox");
          newCheckbox.addEventListener("click", () => {
          taskListItem.classList.toggle("strike");
          updateLocalStorage();
});


    // Add event listener to the delete button of the task
      taskListItem.querySelector(".delete-button").addEventListener('click', function() {
        const checkbox = taskListItem.querySelector(".task-checkbox");
        // Only delete the task if it is checked
        if (checkbox.checked) {
          taskListItem.remove(); // Remove the task from the list
          tasks = tasks.filter(task => task.id !== newTask.id); // Remove the task from the array
          localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
        }
      });

    // Reset the input field value
    newTaskInput.value = "";
  }

  showNoTasksMessage(); // Check if there are any tasks left and display the no tasks message if necessary
  
}

// Event listener to add a new task when the form is submitted
const addTaskForm = document.querySelector("form");
addTaskForm.addEventListener("submit", addTask);

//---------------------------------------------------------------------------------




//-------------------- DELETE TASKS -------------------------------------------


// Function to delete checked tasks
function deleteCheckedTasks() {
  // Get all the checked checkboxes
  const checkedCheckboxes = document.querySelectorAll(".task-checkbox:checked");

  // Reload tasks array from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (checkedCheckboxes.length > 0) {
    // Animating delete button by replacing default icon with a gif
    const originalSrc = deleteButton.querySelector("img").src;
    const newSrc = "/images/icons8-waste-cleanbg.gif";

    deleteButton.querySelector("img").src = newSrc;
    setTimeout(() => {
      deleteButton.querySelector("img").src = originalSrc;
    }, 1000); // change back to original after 2 seconds
  }

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

  // Call the function to check if there are any tasks on page load
  showNoTasksMessage();

}

//---------------------------------------------------------------------------------



//-------------------- Functions to run when page loads -------------------------------------------


// Call the displayTasks function on page load
displayTasks();

// Call the function to check if there are any tasks on page load
showNoTasksMessage();

// Displaying tasks as strikethrough font when checked.
const checkboxes = document.querySelectorAll(".task-checkbox");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const taskListItem = checkbox.parentElement;
    taskListItem.classList.toggle("strike");
    updateLocalStorage();
  });
});

//---------------------------------------------------------------------------------
