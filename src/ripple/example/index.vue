<template>
  <app-type>基本使用</app-type>
  <div
    class="div sun-elevation--2"
    v-ripple
  >点击</div>
  <app-type>自定义颜色</app-type>
  <div
    class="div sun-elevation--2"
    v-ripple="{ color: '#2979ff' }"
  >点击</div>
  <app-type>禁用状态</app-type>
  <div
    class="div sun-elevation--2"
    v-ripple="{disabled: true}"
  >点击</div>
</template>

<script>
import ripple from '../index.ts'
import AppType from '@varlet/cli/site/mobile/components/AppType'
// import BasicUse from './BasicUse'
// import ModifyColor from './ModifyColor'

export default {
  components: {
    AppType
    // BasicUse,
    // ModifyColor
  },
  directives: [ripple]
}
</script>

<style lang="less">
@import '../../styles/elevation';
.div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #888;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
