function loadTasks() {

  try {

    const tasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    return tasks.map(task => ({
      priority: "medium",
      createdAt: Date.now(),
      ...task
    }));

  } catch {

    return [];
  }
}

export const PRIORITY_ORDER = {
  low: 1,
  medium: 2,
  high: 3
};
export const FILTERS = Object.freeze({
  ALL: "all",
  COMPLETED: "completed",
  PENDING: "pending",
});

export const SORTS = Object.freeze({
  NEWEST: "newest",
  ALPHABETICAL: "alphabetical",
  COMPLETED: "completed",
  PRIORITY: "priority",
});

export const PRIORITIES = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
});

export const state = {
  tasks: loadTasks(),
  searchTerm: "",
  currentFilter: FILTERS.ALL,
  currentSort: SORTS.NEWEST
};

export function setSearchTerm(term = "") {
  state.searchTerm = term.trim().toLowerCase();
}

export function setCurrentFilter(filter) {
  const validFilters = Object.values(FILTERS);

  if (validFilters.includes(filter)) {
    state.currentFilter = filter;
  }
}

export function setCurrentSort(sort) {
  const validSorts = Object.values(SORTS);

  if (validSorts.includes(sort)) {
    state.currentSort = sort;
  }
}
