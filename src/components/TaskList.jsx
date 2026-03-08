import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

function TaskList({ tasks, onToggle, onDelete, onEdit, filter }) {
  if (tasks.length === 0) {
    const messages = {
      all: { heading: 'No tasks yet', sub: 'Add a task above to get started.' },
      active: { heading: 'All caught up!', sub: 'No active tasks remaining.' },
      completed: { heading: 'Nothing completed yet', sub: 'Finish some tasks to see them here.' },
    }
    const msg = messages[filter] || messages.all

    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <p className={styles.emptyHeading}>{msg.heading}</p>
        <p className={styles.emptySub}>{msg.sub}</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
