# 按钮

### 引入

```js
import { createApp } from 'vue'
import { Button } from 'basic-ui'

createApp().use(Button)
```

### 主题色按钮
```html
  <sun-button>默认按钮</sun-button>
  <sun-button type="primary">主要按钮</sun-button>
  <sun-button type="info">信息按钮</sun-button>
  <sun-button type="success">成功按钮</sun-button>
  <sun-button type="warning">警告按钮</sun-button>
  <sun-button type="danger">危险按钮</sun-button>
```

### 文字按钮
```html
<sun-button text outline type="primary">外边框按钮</sun-button>
<sun-button type="primary" text>文字按钮</sun-button>
```

### 禁用状态
```html
  <sun-button disabled>禁用状态</sun-button>
  <sun-button disabled text outline>禁用状态</sun-button>
  <sun-button disabled text>禁用状态</sun-button>
```


### 按钮尺寸
```html
  <sun-button type="primary">默认按钮</sun-button>
  <sun-button type="info" size="small">小型按钮</sun-button>
  <sun-button type="success" size="mini">迷你按钮</sun-button>
  <sun-button type="warning" size="large">大型按钮</sun-button>
```

### 块级按钮
```html
  <sun-button block type="primary">块级按钮</sun-button>
```

### 圆形按钮
```html
  <sun-button round type="primary"></sun-button>
```

### 注册事件
```html
  <sun-button :onClick="handleClick" type="primary">点击</sun-button>
  <sun-button :onTouchstart="handleTouchstart" type="primary">触摸</sun-button>
```

### 自定义颜色
```html
  <sun-button color="#69dbaa" text-color="#eee">背景/文字</sun-button>
  <sun-button color="linear-gradient(to right, #69dbaa, #3a7afe)" text-color="#fff">使用渐变</sun-button>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `type` | 类型，可选值为 `default` `primary` `info` `success` `warning` `danger`  | _string_ | `default` |
| `size` | 尺寸，可选值为 `large` `normal` `small` `mini`  | _string_ | `normal` |
| `block` | 是否是块级元素 | _boolean_ | `false` |
| `text` | 是否是文字元素 | _boolean_ | `false` |
| `outline` | 是否使用外边框 | _boolean_ | `false` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `ripple` | 是否使用水波纹 | _boolean_ | `false` |
| `text-color` | 文字颜色 | _string_ | - |
| `color` | 背景颜色 | _string_ | - |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `event: Event` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 按钮内容 | `-` |