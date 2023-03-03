# listify ✅

![Morning Image](https://listify-web-dev.s3.ap-south-1.amazonaws.com/Listify+interface.png)


# Project Description
This is a simple todo application with an attractive interface that allows users to add, delete, and mark tasks as completed. Additionally, the app changes its main image based on the user's system time, with a different image displayed for different times of the day. This enhances the user experience and makes the app more visually appealing.

# Usage
To use this app, simply open the index.html file in a web browser. You will see the main page with a greeting message and an image that changes based on the time of day. To add a new task, click the "Add" button, and a new task form will appear. Enter your task in the input field and click the "Add Task" button. The new task will be added to the task list. To delete a task, click the trash can icon next to the task you want to delete. To mark a task as completed, click the checkbox next to the task.

# Code Overview
The JavaScript code is organized into several sections. The first section is responsible for automating greetings based on the current time of day. It gets the greeting message and image container elements from HTML, gets the current system time, and updates the greeting message and image according to the current time.

The second section is responsible for opening and closing the new task add model. It gets the modal, close button, and open button elements from HTML, opens the modal when the open button is clicked, closes the modal when the close button is clicked, and changes the style of the delete button when it is clicked.

The third section is responsible for adding new tasks. It gets the task list element from HTML, defines a function to add a new task to the task list, defines a function to delete checked tasks, adds event listeners to the delete button and form submit button, and defines functions to display tasks from local storage on page load and update local storage when tasks are added or deleted.

# Credits
The images used in this app are from icons8.

Illustration by <a href="https://icons8.com/illustrations/author/RogqKjMRAQ79">xopolin</a> from <a href="https://icons8.com/illustrations">Ouch!</a>

# License
This app is licensed under the MIT License.
