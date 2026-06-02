import styles from './SortBar.module.css'

const SORT_OPTIONS = [
  { key: 'priority', label: 'Priority' },
  { key: 'dueDate', label: 'Due date' },
  { key: 'created', label: 'Newest' },
  { key: 'title', label: 'A–Z' },
]

function SortBar({ sortBy, onSortChange }) {
  return (
    <div className={styles.bar}>
      <span className={styles.label} id="sort-label">Sort by</span>
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-labelledby="sort-label"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortBar
