const VALID_PRIORITIES = ['high', 'medium', 'low']
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

export function normalizeTask(task) {
  return {
    id: task.id || generateId(),
    title: String(task.title || '').trim(),
    priority: VALID_PRIORITIES.includes(task.priority) ? task.priority : 'medium',
    dueDate: task.dueDate && String(task.dueDate).trim() ? String(task.dueDate).trim() : null,
    completed: Boolean(task.completed),
    createdAt: task.createdAt || new Date().toISOString(),
  }
}

export function formatDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isOverdue(dateString) {
  if (!dateString) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateString) < today
}

export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter((t) => !t.completed)
    case 'completed':
      return tasks.filter((t) => t.completed)
    default:
      return tasks
  }
}

export function searchTasks(tasks, query) {
  const q = query.trim().toLowerCase()
  if (!q) return tasks
  return tasks.filter((t) => t.title.toLowerCase().includes(q))
}

export function sortTasks(tasks, sortBy = 'priority') {
  const priorityOf = (p) => PRIORITY_ORDER[p] ?? 2

  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1

    switch (sortBy) {
      case 'dueDate': {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      }
      case 'created':
        return (b.createdAt || '').localeCompare(a.createdAt || '')
      case 'title':
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      default:
        return priorityOf(a.priority) - priorityOf(b.priority)
    }
  })
}

export function getTaskCounts(tasks) {
  const active = tasks.filter((t) => !t.completed).length
  return {
    all: tasks.length,
    active,
    completed: tasks.length - active,
  }
}
