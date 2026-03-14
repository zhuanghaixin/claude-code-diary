工具	作用
Glob	按文件名模式查找
Grep	按内容关键词查找


## Grep
 # 搜索函数定义
Grep glob="*.{ts,tsx}" path="src" pattern="function.*handle"

# 搜索 CSS 类名
Grep glob="*.{ts,tsx}" path="src" pattern="className"

# 搜索 API 端点
Grep path="src" pattern="/api/"
