import {
    handleDelete,
    handleAddTask,
    handleToggle,
    handleEdit,
    handleSaveTask
} from "./handlers.js";

import {
    renderTasks,
    renderFilters
} from "./render.js";

import {
    setSearchTerm,
    setCurrentFilter,
    setCurrentSort
} from "./state.js";

const taskWrapper =
    document.getElementById("taskWrapper");

taskWrapper.addEventListener(
    "click",
    (event) => {

        const target = event.target;

        if (
            target.classList.contains(
                "delete-btn"
            )
        ) {

            handleDelete(target);

        } else if (
            target.classList.contains(
                "edit-btn"
            )
        ) {

            handleEdit(target);

        } else if (
            target.classList.contains(
                "save-btn"
            )
        ) {

            handleSaveTask(target);

        } else if (
            target.closest("#addTaskBtn")
        ) {

            handleAddTask();

        } else if (
            target.classList.contains(
                "filter-btn"
            )
        ) {

            setCurrentFilter(
                target.dataset.filter
            );

            renderFilters();

            renderTasks();
        }
    }
);

taskWrapper.addEventListener(
    "change",
    (event) => {

        const target = event.target;

        if (
            target.classList.contains(
                "toggle-btn"
            )
        ) {

            handleToggle(target);
        }
        if(target.id === "sortSelect") {
            setCurrentSort(
                target.value
            );
            renderTasks();
        }
    }
);

taskWrapper.addEventListener(
    "input",
    (event) => {

        if (
            event.target.id ===
            "searchInput"
        ) {

            setSearchTerm(
                event.target.value
            );

            renderTasks();
        }
    }
);

taskWrapper.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Enter") return;

        if (
            event.target.id ===
            "taskInput"
        ) {

            handleAddTask();

        } else if (
            event.target.classList.contains(
                "edit-input"
            )
        ) {

            const saveBtn =
                event.target
                    .closest(".task-item")
                    .querySelector(".save-btn");

            if (!saveBtn) return;

            handleSaveTask(saveBtn);
        }
    }
);

renderFilters();

renderTasks();