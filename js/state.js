function loadTasks() {

    try {

        return JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    } catch {

        return [];
    }
}

export const FILTERS = Object.freeze({
    ALL: "all",
    COMPLETED: "completed",
    PENDING: "pending"
});

export const state = {
    tasks: loadTasks(),
    searchTerm: "",
    currentFilter: FILTERS.ALL
};

export function setSearchTerm(term = "") {

    state.searchTerm =
        term.trim().toLowerCase();
}

export function setCurrentFilter(filter) {

    const validFilters =
        Object.values(FILTERS);

    if (validFilters.includes(filter)) {

        state.currentFilter = filter;
    }
}