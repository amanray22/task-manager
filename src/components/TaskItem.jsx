import { useState, useEffect } from 'react'
import { formatDate, isOverdue } from '../utils/taskUtils'
import PriorityPicker from './PriorityPicker'
import styles from './TaskItem.module.css'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')

  useEffect(() => {
    if (!isEditing) {
      setEditTitle(task.title)
      setEditPriority(task.priority)
      setEditDueDate(task.dueDate || '')
    }
  }, [task.title, task.priority, task.dueDate, isEditing])

  function startEditing() {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate || '')
    setIsEditing(true)
  }

  function cancelEditing() {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate || '')
    setIsEditing(false)
  }

  function handleEditSubmit(e) {
    e.preventDefault()
    const trimmed = editTitle.trim()
    if (!trimmed) return
    onEdit(task.id, {
      title: trimmed,
      priority: editPriority,
      dueDate: editDueDate || null,
    })
    setIsEditing(false)
  }

  function handleEditKeyDown(e) {
    if (e.key === 'Escape') cancelEditing()
  }

  const overdue = !task.completed && isOverdue(task.dueDate)
  const formattedDate = formatDate(task.dueDate)

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        />
        <span className={styles.checkmark} aria-hidden="true">
          {task.completed && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </label>

      <div className={styles.content}>
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <input
              className={styles.editInput}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              aria-label="Edit task title"
            />
            <div className={styles.editOptions}>
              <PriorityPicker
                value={editPriority}
                onChange={setEditPriority}
                idPrefix={`edit-${task.id}`}
              />
              <input
                className={styles.editDate}
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                aria-label="Edit due date"
              />
            </div>
            <div className={styles.editActions}>
              <button type="submit" className={styles.saveBtn}>Save</button>
              <button type="button" className={styles.cancelBtn} onClick={cancelEditing}>Cancel</button>
            </div>
          </form>
        ) : (
          <span
            className={styles.title}
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {task.title}
          </span>
        )}

        {!isEditing && (
          <div className={styles.meta}>
            <span className={`${styles.priority} ${styles[task.priority]}`}>
              {task.priority}
            </span>
            {formattedDate && (
              <span className={`${styles.date} ${overdue ? styles.overdue : ''}`}>
                {overdue ? '⚠ ' : ''}{formattedDate}
              </span>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={startEditing}
          aria-label="Edit task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TaskItem
