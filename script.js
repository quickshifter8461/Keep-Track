const inputEl = document.getElementById("input-el");
const errorEl = document.getElementById("error-el");
const addBtn = document.getElementById("add-btn");
const completeBtn = document.getElementById("complete-btn");
const deleteBtn = document.getElementById("delete-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

addBtn.addEventListener("click", () => {
  if (inputEl.value === "") {
    errorEl.innerHTML = "No task entered";
    inputEl.focus();
  } else {
    let description = inputEl.value;
    tasks.push({ description: description, completed: false });
    display();
    inputEl.value = "";
    errorEl.innerHTML = "";
    saveToLocalStorage();
  }
});

completeBtn.addEventListener("click", () => {
  let index =
    parseInt(prompt("Enter the task number to mark as complete:")) - 1;
  if (index >= 0 && index < tasks.length) {
    if (tasks[index].completed) {
      Swal.fire({
        title: "That one?",
        text: "Is that done already?",
        icon: "question",
        showConfirmButton: false,
        timer: 1800,
      });
    } else {
      tasks[index].completed = true;
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Task Completed",
        showConfirmButton: false,
        timer: 1500,
      });
      tasks = tasks.filter((task, i) => i !== index).concat(tasks[index]);
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid task number!",
      timer: 1500,
    });
  }
  display();
  saveToLocalStorage();
});

deleteBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Do you want to delete all task?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Delete",
    denyButtonText: `Keep all`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        icon: "info",
        showConfirmButton: false,
        timer: 1600,
      });
      localStorage.clear();
      taskList.innerHTML = "";
    } else if (result.isDenied) {
      Swal.fire({
        title: "All your task are safe!",
        icon: "success",
        showConfirmButton: false,
        timer: 1600,
      });
    }
  });
});

function display() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let status = task.completed ? "Completed" : "Not Completed";
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = `${i + 1}. ${task.description} - ${status}`;
    taskList.appendChild(li);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getData() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    display();
  }
}

getData();
