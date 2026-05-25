import { updateUI } from "./ui.js";

import {
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    saveTask
} from "./taskService.js";

const taskInput =
    document.getElementById("taskInput");

export function handleDelete(target) {

    const taskId = target.dataset.id;

    const isDeleted =
        deleteTask(taskId);

    if (!isDeleted) return;

    updateUI();
}

export function handleAddTask() {

    const isAdded =
        addTask(taskInput.value);

    if (!isAdded) return;

    taskInput.value = "";

    updateUI();
}

export function handleToggle(target) {

    const taskId = target.dataset.id;

    const isToggled =
        toggleTask(
            taskId,
            target.checked
        );

    if (!isToggled) return;

    updateUI();
}

export function handleEdit(target) {

    const taskId = target.dataset.id;

    const isEditing =
        editTask(taskId);

    if (!isEditing) return;

    updateUI();
}

export function handleSaveTask(target) {

    const taskId = target.dataset.id;

    const taskItem =
        target.closest(".task-item");

    const editInput =
        taskItem.querySelector(".edit-input");

    if (!editInput) return;

    const isSaved =
        saveTask(
            taskId,
            editInput.value
        );

    if (!isSaved) return;

    updateUI();
}