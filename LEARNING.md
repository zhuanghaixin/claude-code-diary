工具	作用
Glob	按文件名模式查找
Grep	按内容关键词查找

技巧：排除 node_modules，缩小搜索范围：


Grep path="todo-app/src" pattern="App"
或者用 glob 排除：


Grep glob="!node_modules/**" pattern="App"
实际项目中的用法
在真实项目中，你通常会：

1.指定目录：path="src" 或 path="src/components"
2.只看代码文件：glob="*.{ts,tsx,js,jsx"
3.显示行号：output_mode="content"



## Grep
 # 搜索函数定义
Grep glob="*.{ts,tsx}" path="src" pattern="function.*handle"

# 搜索 CSS 类名
Grep glob="*.{ts,tsx}" path="src" pattern="className"

# 搜索 API 端点
Grep path="src" pattern="/api/"
