import { saveTasks } from "./storage.js";

import {
    renderTasks,
    renderFilters
} from "./render.js";

export function updateUI() {

    saveTasks();

    renderFilters();

    renderTasks();
}