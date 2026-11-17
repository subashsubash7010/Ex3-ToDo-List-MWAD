"use strict";

const STORAGE_KEY = "daylight-tasks-v1";
const categories = ["Personal", "Work", "Study", "Other"];
const priorities = { low: 1, medium: 2, high: 3 };
let tasks = loadTasks();
let activeView = "all";
let activeCategory = "";
let activeStatus = "all";
let editingTaskId = null;
let toastTimer;

const elements = {
  taskForm: document.querySelector("#task-form"),
  taskInput: document.querySelector("#task-input"),
  categoryInput: document.querySelector("#task-category"),
  priorityInput: document.querySelector("#task-priority"),
  dueInput: document.querySelector("#task-due"),
  taskList: document.querySelector("#task-list"),
  emptyState: document.querySelector("#empty-state"),
  emptyTitle: document.querySelector("#empty-title"),
  emptyCopy: document.querySelector("#empty-copy"),
  search: document.querySelector("#search-input"),
  sort: document.querySelector("#sort-select"),
  clearCompleted: document.querySelector("#clear-completed"),
  editDialog: document.querySelector("#edit-dialog"),
  editForm: document.querySelector("#edit-form"),
  toast: document.querySelector("#toast"),
};

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Saved task data is not a list.");
    return parsed.filter((task) =>
      task &&
      typeof task.id === "string" &&
      typeof task.title === "string" &&
      typeof task.completed === "boolean" &&
      categories.includes(task.category) &&
      Object.hasOwn(priorities, task.priority)
    );
  } catch (error) {
    console.error("Could not load saved tasks.", error);
    window.setTimeout(() => showToast("Saved tasks could not be loaded."), 0);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Could not save tasks.", error);
    showToast("Changes could not be saved in this browser.");
    return false;
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2800);
}

function dateAtLocalMidnight(value = new Date()) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDueDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  if (value === dateString(new Date())) return "Today";
  const tomorrow = dateAtLocalMidnight();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (value === dateString(tomorrow)) return "Tomorrow";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function initDates() {
  const now = new Date();
  document.querySelector("#header-date").textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "short", month: "short", day: "numeric",
  }).format(now);
  document.querySelector("#date-day").textContent = now.getDate();
  document.querySelector("#date-month").textContent = new Intl.DateTimeFormat(undefined, { month: "short" }).format(now);
  document.querySelector("#greeting").textContent = `A FRESH START · ${new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now).toUpperCase()}`;
  elements.dueInput.min = dateString(now);
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createTaskCard(task) {
  const card = makeElement("article", `task-card${task.completed ? " is-completed" : ""}`);
  const checkbox = makeElement("input", "task-checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `${task.completed ? "Mark incomplete" : "Complete"}: ${task.title}`);
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const main = makeElement("div", "task-main");
  const title = makeElement("p", "task-title", task.title);
  const meta = makeElement("div", "task-meta");
  meta.append(makeElement("span", "task-category", task.category));
  meta.append(makeElement("span", `priority-badge priority-${task.priority}`, `${task.priority[0].toUpperCase()}${task.priority.slice(1)} priority`));
  if (task.dueDate) {
    const overdue = !task.completed && task.dueDate < dateString(new Date());
    meta.append(makeElement("span", `due-badge${overdue ? " is-overdue" : ""}`, `${overdue ? "Overdue · " : ""}${formatDueDate(task.dueDate)}`));
  }
  main.append(title, meta);

  const actions = makeElement("div", "task-actions");
  const editButton = makeElement("button", "icon-button", "✎");
  editButton.type = "button";
  editButton.setAttribute("aria-label", `Edit ${task.title}`);
  editButton.addEventListener("click", () => openEditDialog(task));
  const deleteButton = makeElement("button", "icon-button delete-task", "×");
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
  deleteButton.addEventListener("click", () => deleteTask(task.id));
  actions.append(editButton, deleteButton);
  card.append(checkbox, main, actions);
  return card;
}

function matchesView(task) {
  const today = dateString(new Date());
  if (activeView === "today") return !task.completed && task.dueDate === today;
  if (activeView === "upcoming") return !task.completed && task.dueDate && task.dueDate > today;
  if (activeView === "completed") return task.completed;
  return true;
}

function getVisibleTasks() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const filtered = tasks.filter((task) => {
    if (!matchesView(task)) return false;
    if (activeCategory && task.category !== activeCategory) return false;
    if (activeStatus === "active" && task.completed) return false;
    if (activeStatus === "completed" && !task.completed) return false;
    return !query || task.title.toLocaleLowerCase().includes(query) || task.category.toLocaleLowerCase().includes(query);
  });
  const sortBy = elements.sort.value;
  return filtered.sort((a, b) => {
    if (sortBy === "due") return (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31");
    if (sortBy === "priority") return priorities[b.priority] - priorities[a.priority];
    if (sortBy === "alpha") return a.title.localeCompare(b.title);
    return b.createdAt - a.createdAt;
  });
}

function render() {
  const visibleTasks = getVisibleTasks();
  elements.taskList.replaceChildren(...visibleTasks.map(createTaskCard));
  elements.emptyState.hidden = visibleTasks.length > 0;
  elements.taskList.hidden = visibleTasks.length === 0;
  document.querySelector("#visible-count").textContent = visibleTasks.length;
  document.querySelector("#stat-total").textContent = tasks.length;
  document.querySelector("#stat-completed").textContent = tasks.filter((task) => task.completed).length;
  document.querySelector("#stat-active").textContent = tasks.filter((task) => !task.completed).length;
  document.querySelector("#all-count").textContent = tasks.filter((task) => !task.completed).length;
  document.querySelector("#today-count").textContent = tasks.filter((task) => !task.completed && task.dueDate === dateString(new Date())).length;

  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  document.querySelector("#progress-percent").textContent = `${progress}%`;
  document.querySelector("#progress-fill").style.width = `${progress}%`;
  document.querySelector("#progress-label").textContent = tasks.length
    ? progress === 100 ? "Everything is checked off — amazing!" : `${completed} of ${tasks.length} tasks completed`
    : "A good time to get started";
  elements.clearCompleted.hidden = completed === 0;
  elements.emptyTitle.textContent = elements.search.value.trim() ? "No tasks match your search" : "Nothing on your list yet";
  elements.emptyCopy.textContent = elements.search.value.trim()
    ? "Try another search or switch to a different view."
    : "Add a task above and make today count.";
}

function commitChange(message) {
  const saved = saveTasks();
  render();
  if (message && saved) showToast(message);
}

function addTask(event) {
  event.preventDefault();
  const title = elements.taskInput.value.trim();
  if (!title) {
    elements.taskInput.focus();
    return;
  }
  tasks.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    category: elements.categoryInput.value,
    priority: elements.priorityInput.value,
    dueDate: elements.dueInput.value,
    completed: false,
    createdAt: Date.now(),
  });
  elements.taskForm.reset();
  elements.priorityInput.value = "medium";
  commitChange("Task added");
  elements.taskInput.focus();
}

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  task.completed = !task.completed;
  commitChange(task.completed ? "Task completed" : "Task marked as to do");
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  commitChange("Task deleted");
}

function clearCompleted() {
  const completed = tasks.filter((task) => task.completed).length;
  if (!completed) return;
  tasks = tasks.filter((task) => !task.completed);
  commitChange(`${completed} completed ${completed === 1 ? "task" : "tasks"} cleared`);
}

function openEditDialog(task) {
  editingTaskId = task.id;
  elements.editForm.elements.title.value = task.title;
  elements.editForm.elements.category.value = task.category;
  elements.editForm.elements.priority.value = task.priority;
  elements.editForm.elements.dueDate.value = task.dueDate || "";
  elements.editDialog.showModal();
  elements.editForm.elements.title.focus();
}

function saveEdit(event) {
  event.preventDefault();
  const task = tasks.find((item) => item.id === editingTaskId);
  if (!task) return;
  task.title = elements.editForm.elements.title.value.trim();
  task.category = elements.editForm.elements.category.value;
  task.priority = elements.editForm.elements.priority.value;
  task.dueDate = elements.editForm.elements.dueDate.value;
  elements.editDialog.close();
  commitChange("Task updated");
}

function setView(view, category = "") {
  activeView = view;
  activeCategory = category;
  document.querySelectorAll(".nav-item[data-filter]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.filter === view && !category);
  });
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.category === category);
  });
  const viewName = category || ({
    all: "All tasks", today: "Today", upcoming: "Upcoming", completed: "Completed",
  }[view] || "All tasks");
  document.querySelector("#view-name").textContent = viewName;
  const titleParts = category
    ? [`${category} `, "tasks."]
    : view === "upcoming" ? ["Coming ", "up."]
      : view === "completed" ? ["Look what ", "you did."]
        : ["Your day, ", "your pace."];
  const pageTitle = document.querySelector("#page-title");
  pageTitle.replaceChildren(document.createTextNode(titleParts[0]), makeElement("span", "", titleParts[1]));
  document.querySelector("#task-heading").firstChild.textContent = category ? `${category} tasks ` : `${view === "today" ? "Today's" : view === "upcoming" ? "Upcoming" : view === "completed" ? "Completed" : "Tasks"} `;
  render();
}

elements.taskForm.addEventListener("submit", addTask);
elements.search.addEventListener("input", render);
elements.sort.addEventListener("change", render);
elements.clearCompleted.addEventListener("click", clearCompleted);
elements.editForm.addEventListener("submit", saveEdit);
document.querySelector("#cancel-edit").addEventListener("click", () => elements.editDialog.close());
document.querySelector(".dialog-close").addEventListener("click", () => elements.editDialog.close());
elements.editDialog.addEventListener("close", () => { editingTaskId = null; });

document.querySelectorAll(".nav-item[data-filter]").forEach((item) => {
  item.addEventListener("click", () => {
    activeStatus = "all";
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.toggle("is-selected", tab.dataset.status === "all"));
    setView(item.dataset.filter);
  });
});
document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", () => {
    activeStatus = "all";
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.toggle("is-selected", tab.dataset.status === "all"));
    setView("all", item.dataset.category);
  });
});
document.querySelectorAll(".filter-tab").forEach((item) => {
  item.addEventListener("click", () => {
    activeStatus = item.dataset.status;
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.toggle("is-selected", tab === item));
    render();
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !elements.editDialog.open && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.search.focus();
  }
});

initDates();
render();
