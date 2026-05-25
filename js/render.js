import { state, FILTERS, SORTS, PRIORITY_ORDER } from "./state.js";

const taskList = document.getElementById("taskList");

const filterContainer = document.querySelector(".filter-container");

export function renderTasks() {
  if (state.tasks.length === 0) {
    taskList.innerHTML = `
            <p class="empty-state">
                No tasks available.
                Add a new task to get started!
            </p>
        `;

    return;
  }

  const filteredTasks = state.tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(state.searchTerm);

    const matchesFilter =
      state.currentFilter === FILTERS.ALL ||
      (state.currentFilter === FILTERS.COMPLETED && task.completed) ||
      (state.currentFilter === FILTERS.PENDING && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (state.currentSort) {
      case SORTS.NEWEST:
        return b.createdAt - a.createdAt;

      case SORTS.ALPHABETICAL:
        return a.title.localeCompare(b.title);

      case SORTS.COMPLETED:
        return a.completed - b.completed;
      case SORTS.PRIORITY:
        const priorityOrder = PRIORITY_ORDER;
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  if (sortedTasks.length === 0) {
    taskList.innerHTML = `
            <p class="empty-state">
                No matching tasks found
            </p>
        `;

    return;
  }

  const fragment = document.createDocumentFragment();

  sortedTasks.forEach((task) => {
    fragment.appendChild(createTaskElement(task));
  });

  taskList.replaceChildren(fragment);
}

export function createTaskElement(task) {
  const div = document.createElement("div");

  div.className = "task-item";

  div.innerHTML = `

        <div class="task-content">

            <input
                type="checkbox"
                class="toggle-btn"
                data-id="${task.id}"
                ${task.completed ? "checked" : ""}
            />

            ${
              task.isEditing
                ? `

                    <input
                        type="text"
                        class="edit-input"
                        value="${task.title}"
                    />

                `
                : `

                    <span
                        class="${task.completed ? "completed" : ""}"
                    >
                        ${task.title}
                    </span>
                    <span
                    class="
                            priority-badge
                            ${task.priority}
                        "
                    >
                        ${task.priority}
                    </span>

                `
            }

        </div>

        <div class="task-actions">

            <button
                class="${task.isEditing ? "save-btn" : "edit-btn"}"
                data-id="${task.id}"
            >
                ${task.isEditing ? "Save" : "Edit"}
            </button>

            <button
                class="delete-btn"
                data-id="${task.id}"
            >
                Delete
            </button>

        </div>
    `;

  return div;
}

export function renderFilters() {
  filterContainer.innerHTML = "";

  const filters = Object.values(FILTERS);

  filters.forEach((filter) => {
    const button = document.createElement("button");

    button.className = `
            filter-btn
            ${state.currentFilter === filter ? "active" : ""}
        `;

    button.dataset.filter = filter;

    button.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);

    filterContainer.appendChild(button);
  });
}
