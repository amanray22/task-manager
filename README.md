# Task Manager

A responsive task management application built with React and Vite.

## Features

- **Task creation** with title, priority level, and optional due date
- **Completion tracking** with checkbox toggle
- **Inline editing** by double-clicking a task title or clicking the edit icon
- **Priority levels** — High, Medium, Low (color-coded)
- **Due date support** with overdue warnings
- **Filter by status** — All, Active, Completed
- **Progress tracker** showing completion percentage
- **Clear completed** to bulk-remove finished tasks
- **Local storage persistence** — tasks survive page refresh

## Tech Stack

- React 18
- Vite 5
- CSS Modules
- Modern JavaScript (ES6+)
- React Hooks: `useState`, `useEffect`
- Custom hook: `useLocalStorage`

## Project Structure

```
src/
├── components/
│   ├── FilterBar.jsx / .module.css
│   ├── StatsBar.jsx / .module.css
│   ├── TaskForm.jsx / .module.css
│   ├── TaskItem.jsx / .module.css
│   └── TaskList.jsx / .module.css
├── hooks/
│   └── useLocalStorage.js
├── utils/
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
