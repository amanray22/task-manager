import { useState, useRef, useEffect } from 'react'
import PriorityPicker from './PriorityPicker'
import styles from './TaskForm.module.css'

function TaskForm({ onAddTask, inputRef }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [expanded, setExpanded] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    function handlePointerDown(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

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
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Add a new task… (press N)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          aria-label="New task title"
        />
        <button type="submit" className={styles.addButton} disabled={!title.trim()}>
          Add
        </button>
      </div>

      {expanded && (
        <div className={styles.options}>
          <div className={styles.field}>
            <span className={styles.label}>Priority</span>
            <PriorityPicker value={priority} onChange={setPriority} idPrefix="new-priority" />
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
