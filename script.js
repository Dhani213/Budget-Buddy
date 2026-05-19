const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const quote = document.getElementById("quote");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    fetchQuote();
});

// Add task button click event
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();

    // Validation
    if (taskText === "") {
        errorMsg.textContent = "Please enter a task.";
        return;
    }

    errorMsg.textContent = "";

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText
    };

    // Add to UI
    createTaskElement(task);

    // Save to localStorage
    saveTask(task);

    // Clear input
    taskInput.value = "";
}

// Function to create task element
function createTaskElement(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Delete event
    deleteBtn.addEventListener("click", () => {
        li.remove();
        deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks on page refresh
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => createTaskElement(task));
}

// Delete task from localStorage
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fetch motivational quote using Fetch API
async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        quote.textContent = `"${data.content}" — ${data.author}`;
    } catch (error) {
        quote.textContent = "Stay focused and keep learning!";
    }
}