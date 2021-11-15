<template>
  <app-type>主题色按钮</app-type>
  <sun-button>默认按钮</sun-button>
  <sun-button type="primary">主要按钮</sun-button>
  <sun-button type="info">信息按钮</sun-button>
  <sun-button type="success">成功按钮</sun-button>
  <sun-button type="warning">警告按钮</sun-button>
  <sun-button type="danger">危险按钮</sun-button>

  <app-type>文字按钮</app-type>
  <sun-button
    text
    outline
    type="primary"
  >外边框按钮</sun-button>
  <sun-button
    type="primary"
    text
  >文字按钮</sun-button>

  <app-type>禁用状态</app-type>
  <sun-button disabled>禁用状态</sun-button>
  <sun-button
    disabled
    text
    outline
  >禁用状态</sun-button>
  <sun-button
    disabled
    text
  >禁用状态</sun-button>

  <app-type>按钮尺寸</app-type>
  <sun-button type="primary">默认按钮</sun-button>
  <sun-button
    type="info"
    size="small"
  >小型按钮</sun-button>
  <sun-button
    type="success"
    size="mini"
  >迷你按钮</sun-button>
  <sun-button
    type="warning"
    size="large"
  >大型按钮</sun-button>

  <app-type>块级按钮</app-type>
  <sun-button
    block
    type="primary"
  >块级按钮</sun-button>

  <app-type>自定义颜色</app-type>
  <sun-button
    color="#69dbaa"
    text-color="#eee"
  >背景/文字</sun-button>
  <sun-button
    color="linear-gradient(to right, #69dbaa, #3a7afe)"
    text-color="#fff"
  >使用渐变</sun-button>

  <app-type>圆形按钮</app-type>
  <sun-button
    type="primary"
    round
  >aa</sun-button>

  <app-type>注册事件</app-type>
  <sun-button
    type="success"
    @click="handleClick"
  >点击</sun-button>
  <sun-button
    type="success"
    @touchstart="handleTouchstart"
  >触摸</sun-button>
</template>

<script>
import Button from '../Button'
import AppType from '@varlet/cli/site/mobile/components/AppType'
// import BasicUse from './BasicUse'
// import ModifyColor from './ModifyColor'

export default {
  components: {
    [Button.name]: Button,
    AppType
    // BasicUse,
    // ModifyColor
  },
  methods: {
    handleClick() {
      console.log('handleClick')
    },
    handleTouchstart() {
      console.log('handleTouchstart')
    }
  }
}
</script>

<style lang="less">
.sun-button {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
