import styles from './StatsBar.module.css'

function StatsBar({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className={styles.stats}>
      <div className={styles.info}>
        <span className={styles.label}>
          {completed} of {total} tasks completed
        </span>
        <span className={styles.percent}>{percent}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default StatsBar
