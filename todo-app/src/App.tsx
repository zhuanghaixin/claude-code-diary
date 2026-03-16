import { useState, useEffect, useMemo } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(()=>{
    const saved=localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (!inputValue.trim()) return
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
    setInputValue('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  const total = todos.length
  const completed = todos.filter(todo => todo.completed).length
  const percentage = total > 0 ? (completed / total) * 100 : 0


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