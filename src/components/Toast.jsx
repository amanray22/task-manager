import styles from './Toast.module.css'

function Toast({ message, actionLabel, onAction, onDismiss }) {
  if (!message) return null

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.message}>{message}</span>
      <div className={styles.actions}>
        {actionLabel && (
          <button type="button" className={styles.action} onClick={onAction}>
            {actionLabel}
          </button>
        )}
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast
