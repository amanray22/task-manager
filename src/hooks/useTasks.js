import { useState, useEffect } from 'react'
import { loadTasks, saveTasks } from '../utils/storage'

function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(() => loadTasks(initialTasks))

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  return [tasks, setTasks]
}

export default useTasks
