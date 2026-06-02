import { normalizeTask } from './taskUtils'

export const STORAGE_VERSION = 2
export const TASKS_KEY = 'taskmanager_tasks'

export function loadTasks(fallback) {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY)
    if (!raw) return fallback.map(normalizeTask)

    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed.map(normalizeTask)
    }
    if (parsed?.version === STORAGE_VERSION && Array.isArray(parsed.tasks)) {
      return parsed.tasks.map(normalizeTask)
    }
    return fallback.map(normalizeTask)
  } catch (error) {
    console.error('Error loading tasks:', error)
    return fallback.map(normalizeTask)
  }
}

export function saveTasks(tasks) {
  try {
    window.localStorage.setItem(
      TASKS_KEY,
      JSON.stringify({ version: STORAGE_VERSION, tasks })
    )
  } catch (error) {
    console.error('Error saving tasks:', error)
  }
}
