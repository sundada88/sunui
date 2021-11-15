<template>
  <app-type>主题色按钮</app-type>
  <sun-style-provider></sun-style-provider>
</template>

<script>
import StyleProvider from '..'
import AppType from '@varlet/cli/site/mobile/components/AppType'
// import BasicUse from './BasicUse'
// import ModifyColor from './ModifyColor'

export default {
  components: {
    [StyleProvider.name]: StyleProvider,
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
