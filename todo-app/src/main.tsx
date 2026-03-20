/**
 * React 应用入口文件
 * 负责将 App 组件渲染到 DOM 中
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 创建根节点并渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode 在开发环境检测潜在问题
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)