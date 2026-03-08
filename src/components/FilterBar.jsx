import styles from './FilterBar.module.css'

function FilterBar({ filter, onFilterChange, counts }) {
  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ]

  return (
    <div className={styles.bar}>
      {filters.map((f) => (
        <button
          key={f.key}
          className={`${styles.btn} ${filter === f.key ? styles.active : ''}`}
          onClick={() => onFilterChange(f.key)}
        >
          {f.label}
          <span className={styles.badge}>{f.count}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterBar
