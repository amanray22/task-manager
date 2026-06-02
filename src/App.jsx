import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import useTasks from './hooks/useTasks'
import useTheme from './hooks/useTheme'
import { generateId, filterTasks, searchTasks, sortTasks, getTaskCounts, normalizeTask } from './utils/taskUtils'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import StatsBar from './components/StatsBar'
import SearchBar from './components/SearchBar'
import SortBar from './components/SortBar'
import ThemeToggle from './components/ThemeToggle'
import Toast from './components/Toast'
import styles from './App.module.css'

const SAMPLE_TASKS = [
  { id: generateId(), title: 'Review project requirements document', priority: 'high', dueDate: '2026-06-10', completed: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Set up GitHub repository and push initial commit', priority: 'high', dueDate: '2026-06-05', completed: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Build TaskForm and TaskItem components', priority: 'medium', dueDate: '2026-06-12', completed: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Write README with setup instructions', priority: 'low', dueDate: null, completed: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Deploy app to Vercel or Netlify', priority: 'medium', dueDate: '2026-06-20', completed: false, createdAt: new Date().toISOString() },
]

const UNDO_MS = 5000

function App() {
  const [tasks, setTasks] = useTasks(SAMPLE_TASKS)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('priority')
  const [deletedTask, setDeletedTask] = useState(null)
  const { theme, label: themeLabel, cycleTheme } = useTheme()
  const formInputRef = useRef(null)
  const undoTimerRef = useRef(null)

  const clearUndoTimer = useCallback(() => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current)
      undoTimerRef.current = null
    }
  }, [])

  useEffect(() => () => clearUndoTimer(), [clearUndoTimer])

  function handleAddTask({ title, priority, dueDate }) {
    const newTask = normalizeTask({
      id: generateId(),
      title,
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    })
    setTasks((prev) => [newTask, ...prev])
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function handleDelete(id) {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    setTasks((prev) => prev.filter((t) => t.id !== id))
    clearUndoTimer()
    setDeletedTask(task)
    undoTimerRef.current = setTimeout(() => {
      setDeletedTask(null)
      undoTimerRef.current = null
    }, UNDO_MS)
  }

  function handleUndoDelete() {
    if (!deletedTask) return
    setTasks((prev) => [deletedTask, ...prev])
    setDeletedTask(null)
    clearUndoTimer()
  }

  function handleEdit(id, updates) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? normalizeTask({ ...t, ...updates }) : t))
    )
  }

  function handleClearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }

  const counts = useMemo(() => getTaskCounts(tasks), [tasks])

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter)
    const searched = searchTasks(filtered, searchQuery)
    return sortTasks(searched, sortBy)
  }, [tasks, filter, searchQuery, sortBy])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'n' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        formInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>My Tasks</h1>
            <p className={styles.subtitle}>Stay focused, get things done.</p>
          </div>
          <div className={styles.headerActions}>
            <ThemeToggle theme={theme} label={themeLabel} onToggle={cycleTheme} />
            {counts.completed > 0 && (
              <button className={styles.clearBtn} onClick={handleClearCompleted}>
                Clear completed
              </button>
            )}
          </div>
        </header>

        <StatsBar total={counts.all} completed={counts.completed} />
        <TaskForm onAddTask={handleAddTask} inputRef={formInputRef} />
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        <div className={styles.toolbar}>
          <FilterBar filter={filter} onFilterChange={setFilter} counts={counts} />
          <SortBar sortBy={sortBy} onSortChange={setSortBy} />
        </div>
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          filter={filter}
          searchQuery={searchQuery}
        />
      </div>

      <Toast
        message={deletedTask ? `"${deletedTask.title}" deleted` : null}
        actionLabel="Undo"
        onAction={handleUndoDelete}
        onDismiss={() => {
          setDeletedTask(null)
          clearUndoTimer()
        }}
      />
    </div>
  )
}

export default App
