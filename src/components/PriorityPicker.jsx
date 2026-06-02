import styles from './PriorityPicker.module.css'

const PRIORITIES = ['high', 'medium', 'low']

function PriorityPicker({ value, onChange, idPrefix = 'priority' }) {
  return (
    <div className={styles.group} role="group" aria-label="Priority">
      {PRIORITIES.map((p) => (
        <button
          key={p}
          type="button"
          id={`${idPrefix}-${p}`}
          className={`${styles.btn} ${styles[p]} ${value === p ? styles.active : ''}`}
          aria-pressed={value === p}
          onClick={() => onChange(p)}
        >
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default PriorityPicker
