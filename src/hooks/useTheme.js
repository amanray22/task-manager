import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme) {
  return theme === 'system' ? getSystemTheme() : theme
}

function useTheme() {
  const [theme, setTheme] = useLocalStorage('taskmanager_theme', 'system')

  useEffect(() => {
    const resolved = resolveTheme(theme)
    document.documentElement.setAttribute('data-theme', resolved)

    if (theme !== 'system') return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    function onChange() {
      document.documentElement.setAttribute('data-theme', getSystemTheme())
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  function cycleTheme() {
    setTheme((current) => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'system'
      return 'light'
    })
  }

  const resolved = resolveTheme(theme)
  const label = theme === 'system' ? `System (${resolved})` : theme.charAt(0).toUpperCase() + theme.slice(1)

  return { theme, resolved, label, cycleTheme }
}

export default useTheme
