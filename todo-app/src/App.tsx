import { useState, useEffect, useMemo, useCallback } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(()=>{
    try {
      const saved = localStorage.getItem('todos')
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [inputValue, setInputValue] = useState('')

  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return
    setTodos(prev => [...prev, { id: Date.now(), text: inputValue, completed: false }])
    setInputValue('')
  }, [inputValue])

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [])

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  // 统计数据（用 useMemo 缓存）
  const { total, completed, percentage } = useMemo(() => {
    const t = todos.length
    const c = todos.filter(todo => todo.completed).length
    return {
      total: t,
      completed: c,
      percentage: t > 0 ? (c / t) * 100 : 0
    }
  }, [todos])


  // 筛选功能
  const [filter, setFilter] = useState<('all' | 'active' | 'completed')>('all')
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
    }
  }, [todos, filter])


  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="stats">
        <span>总计: {total}</span>
        <span>完成: {completed}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="filter">
        <button onClick={() => setFilter('all')}>全部</button>
        <button onClick={() => setFilter('active')}>进行中</button>
        <button onClick={() => setFilter('completed')}>已完成</button>
      </div>
      <div className="add-todo">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="添加新任务..."
        />
        <button onClick={addTodo}>添加</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map(todo => (  
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App