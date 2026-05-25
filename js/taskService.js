import { state } from "./state.js";

export function addTask(title = "", priority = "medium") {

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return false;

    state.tasks.push({
        id: crypto.randomUUID(),
        title: trimmedTitle,
        priority,
        completed: false,
        isEditing: false,
        createdAt: Date.now()
    });

    return true;
}

export function deleteTask(taskId) {

    const taskIndex =
        state.tasks.findIndex(
            task => task.id === taskId
        );

    if (taskIndex === -1) return false;

    state.tasks.splice(taskIndex, 1);

    return true;
}

export function toggleTask(taskId, completed) {

    const task =
        state.tasks.find(
            task => task.id === taskId
        );

    if (!task) return false;

    task.completed = completed;

    return true;
}

export function editTask(taskId) {

    const task =
        state.tasks.find(
            task => task.id === taskId
        );

    if (!task) return false;

    state.tasks.forEach(task => {
        task.isEditing = false;
    });

    task.isEditing = true;

    return true;
}

export function saveTask(
    taskId,
    newTitle = ""
) {

    const task =
        state.tasks.find(
            task => task.id === taskId
        );

    if (!task) return false;

    const trimmedTitle =
        newTitle.trim();

    if (!trimmedTitle) return false;

    task.title = trimmedTitle;
    task.updatedAt = Date.now();

    task.isEditing = false;

    return true;
}

