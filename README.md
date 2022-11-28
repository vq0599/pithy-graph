# 简形

### 概念及命名规范
- **Workspace/Prezi**: 一个工作区（即一个PPT文件），`Prezi`为是`Presentation`的缩写。
- **Slide**: PPT中的具体的一页。
- **Canvas**: 画布，渲染`Slide`的容器概念。
- **Element**: 元素，设计层面的最小粒度，如：文本、图形等。代码层面以大写字母`IE`开头，如`IEText`。

未完待续...


## 设计原则

- data数据v-model的形式，完全同步
- 提供`set`API给外部调用
- 提供`save`接口，让用户保存