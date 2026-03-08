import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { generateId, filterTasks, sortTasks } from './utils/taskUtils'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import StatsBar from './components/StatsBar'
import styles from './App.module.css'

const SAMPLE_TASKS = [
  { id: generateId(), title: 'Review project requirements document', priority: 'high', dueDate: '2026-03-10', completed: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Set up GitHub repository and push initial commit', priority: 'high', dueDate: '2026-03-09', completed: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Build TaskForm and TaskItem components', priority: 'medium', dueDate: '2026-03-11', completed: false, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Write README with setup instructions', priority: 'low', dueDate: '', completed: true, createdAt: new Date().toISOString() },
  { id: generateId(), title: 'Deploy app to Vercel or Netlify', priority: 'medium', dueDate: '2026-03-15', completed: false, createdAt: new Date().toISOString() },
]

function App() {
  const [tasks, setTasks] = useLocalStorage('taskmanager_tasks', SAMPLE_TASKS)
  const [filter, setFilter] = useState('all')

  function handleAddTask({ title, priority, dueDate }) {
    const newTask = {
      id: generateId(),
      title,
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleEdit(id, updates) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  function handleClearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  const visibleTasks = sortTasks(filterTasks(tasks, filter))

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>My Tasks</h1>
            <p className={styles.subtitle}>Stay focused, get things done.</p>
          </div>
          {counts.completed > 0 && (
            <button className={styles.clearBtn} onClick={handleClearCompleted}>
              Clear completed
            </button>
          )}
        </header>

        <StatsBar total={counts.all} completed={counts.completed} />
        <TaskForm onAddTask={handleAddTask} />
        <FilterBar filter={filter} onFilterChange={setFilter} counts={counts} />
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          filter={filter}
        />
      </div>
    </div>
  )
}

export default App
