
class TaskManager {
  constructor(formSelector, inputSelector, listSelector) {
    this.form = document.querySelector(formSelector);
    this.input = document.querySelector(inputSelector);
    this.listEl = document.querySelector(listSelector);

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
    this.input.value = "";
  }

  addTask(task) {
    const taskContainer = this.createTaskContainer();
    const contentContainer = this.createContentContainer(taskContainer);
    const taskInput = this.createTaskInput(contentContainer, task);
    const buttonsContainer = this.createButtonsContainer(contentContainer);

    this.createButton(buttonsContainer, "Edit", () => {
      this.toggleEditMode(taskInput);
    },'edit');
    this.createButton(buttonsContainer, "Delete", () => {
      this.deleteTask(taskContainer);
    },'delete');
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
        buttonEl.classList.add(className); 
    }
    buttonEl.addEventListener("click", onClick);
    parentElement.appendChild(buttonEl);
    return buttonEl;
}

  toggleEditMode(taskInput) {
    if (taskInput.readOnly) {
      taskInput.removeAttribute("readonly");
      taskInput.focus();
    } else {
      taskInput.setAttribute("readonly", "readonly");
    }
  }

  deleteTask(taskContainer) {
    this.listEl.removeChild(taskContainer);
  }
}
const taskManager = new TaskManager("#new-task-form", "#new-task-input", "#tasks");

