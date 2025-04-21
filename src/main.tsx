import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AddTodo from './components/AddTodo.tsx'
import EditTodo from './components/EditTodo.tsx'
import TodoItem from './components/TodoItem.tsx'
import TodoList from './components/TodoList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    <AddTodo/>
    <EditTodo/> 
    <TodoList/>
    <TodoItem/>
  </StrictMode>,
)
