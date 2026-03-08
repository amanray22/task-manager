import { useState } from 'react'
import styles from './TaskForm.module.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [expanded, setExpanded] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    onAddTask({ title: trimmed, priority, dueDate })
    setTitle('')
    setPriority('medium')
    setDueDate('')
    setExpanded(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className={styles.addButton} disabled={!title.trim()}>
          Add
        </button>
      </div>

      {expanded && (
        <div className={styles.options}>
          <div className={styles.field}>
            <label className={styles.label}>Priority</label>
            <div className={styles.priorityGroup}>
              {['high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.priorityBtn} ${styles[p]} ${priority === p ? styles.active : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              className={styles.dateInput}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </form>
  )
}

export default TaskForm
