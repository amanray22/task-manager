# Task Manager

A responsive task management application built with React and Vite.

## Features

- **Task creation** with title, priority level, and optional due date
- **Completion tracking** with accessible checkbox controls
- **Full inline editing** — title, priority, and due date (double-click or edit icon)
- **Priority levels** — High, Medium, Low (color-coded)
- **Due date support** with overdue warnings
- **Filter by status** — All, Active, Completed
- **Search** — filter tasks by title (press `/` to focus)
- **Sort options** — Priority, Due date, Newest, A–Z
- **Progress tracker** showing completion percentage
- **Clear completed** to bulk-remove finished tasks
- **Undo delete** — 5-second window to restore deleted tasks
- **Dark mode** — Light, Dark, or System theme
- **Keyboard shortcuts** — `/` search, `N` new task
- **Versioned local storage** — tasks survive refresh with schema migration

## Tech Stack

- React 18
- Vite 5
- CSS Modules
- Modern JavaScript (ES6+)
- React Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`
- Custom hooks: `useTasks`, `useLocalStorage`, `useTheme`

## Project Structure

```
src/
├── components/
│   ├── FilterBar.jsx / .module.css
│   ├── PriorityPicker.jsx / .module.css
│   ├── SearchBar.jsx / .module.css
│   ├── SortBar.jsx / .module.css
│   ├── StatsBar.jsx / .module.css
│   ├── TaskForm.jsx / .module.css
│   ├── TaskItem.jsx / .module.css
│   ├── TaskList.jsx / .module.css
│   ├── ThemeToggle.jsx / .module.css
│   └── Toast.jsx / .module.css
├── hooks/
│   ├── useLocalStorage.js
│   ├── useTasks.js
│   └── useTheme.js
├── utils/
│   ├── storage.js
│   └── taskUtils.js
├── App.jsx / App.module.css
├── main.jsx
└── index.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `N` | Focus new task input |
