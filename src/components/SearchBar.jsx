import { useRef, useEffect } from 'react'
import styles from './SearchBar.module.css'

function SearchBar({ query, onQueryChange, inputRef }) {
  const localRef = useRef(null)
  const ref = inputRef || localRef

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        ref.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ref])

  return (
    <div className={styles.wrap}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        ref={ref}
        className={styles.input}
        type="search"
        placeholder="Search tasks…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Search tasks"
      />
      {query && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onQueryChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      <kbd className={styles.hint} aria-hidden="true">/</kbd>
    </div>
  )
}

export default SearchBar
