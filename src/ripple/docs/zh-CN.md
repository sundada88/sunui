# 按钮

### 引入

```js
import { createApp } from 'vue'
import { Ripple } from 'basic-ui'

createApp().use(Button)
```

### 基本使用
```html
  <div class="block sun-elevation--2" v-ripple>点击</div>
```


### 自定义颜色
```html
  <div class="block sun-elevation--2" v-ripple="{color: '#2979ff'}">点击</div>
```


### 禁用状态
```html
  <div class="block sun-elevation--2" v-ripple="{disabled: true}">点击</div>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `color` | 水波纹颜色 | _string_ | `default` |
| `disabled` | 禁用状态 | _boolean_ | `false` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--ripple-cubic-bezier` | _cubic-bezier(0.68, 0.01, 0.62, 0.6)_|
