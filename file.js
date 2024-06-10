class TaskManager {
  constructor(formSelector, inputSelector, listSelector) {
    this.form = document.querySelector(formSelector);
    this.input = document.querySelector(inputSelector);
    this.listEl = document.querySelector(listSelector);

    this.loadTasks();

    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const task = this.input.value;
    if (!task) {
      alert("Please fill out the task");
      return;
    }
    this.addTask(task);
    this.saveTasks();
    this.input.value = "";
  }

  addTask(task) {
    const taskContainer = this.createTaskContainer();
    const contentContainer = this.createContentContainer(taskContainer);
    const taskInput = this.createTaskInput(contentContainer, task);
    const buttonsContainer = this.createButtonsContainer(contentContainer);

    const editButton = this.createButton(buttonsContainer, "Edit", () => {
      this.toggleEditMode(taskInput, editButton);
    }, 'edit');
    const deleteButton = this.createButton(buttonsContainer, "Delete", () => {
      this.deleteTask(taskContainer);
      this.saveTasks();
    }, 'delete');

    this.saveTasks();  // Save tasks to local storage whenever a new task is added
  }

  createTaskContainer() {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    this.listEl.appendChild(taskEl);
    return taskEl;
  }

  createContentContainer(parentElement) {
    const contentEl = document.createElement("div");
    contentEl.classList.add("content");
    parentElement.appendChild(contentEl);
    return contentEl;
  }

  createTaskInput(parentElement, task) {
    const taskInputEl = document.createElement("input");
    taskInputEl.classList.add("text");
    taskInputEl.type = "text";
    taskInputEl.value = task;
    taskInputEl.setAttribute("readonly", "readonly");
    parentElement.appendChild(taskInputEl);
    return taskInputEl;
  }

  createButtonsContainer(parentElement) {
    const buttonsEl = document.createElement("div");
    buttonsEl.classList.add("actions");
    parentElement.appendChild(buttonsEl);
    return buttonsEl;
  }

  createButton(parentElement, text, onClick, ...className) {
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = text;
    if (className) {
        buttonEl.classList.add(...className); 
    }
    buttonEl.addEventListener("click", onClick);
    parentElement.appendChild(buttonEl);
    return buttonEl;
  }

  toggleEditMode(taskInput, editButton) {
    if (taskInput.readOnly) {
      taskInput.readOnly = false;
      taskInput.focus();
      editButton.innerHTML = "Save";
    } else {
      taskInput.readOnly = true;
      editButton.innerHTML = "Edit";
      this.saveTasks(); // Save tasks to local storage whenever a task is edited
    }
  }

  deleteTask(taskContainer) {
    this.listEl.removeChild(taskContainer);
  }

  saveTasks() {
    const tasks = [];
    this.listEl.querySelectorAll(".task").forEach(taskEl => {
      const taskInput = taskEl.querySelector(".text");
      tasks.push(taskInput.value);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => this.addTask(task));
  }
}

const taskManager = new TaskManager("#new-task-form", "#new-task-input", "#tasks");


