<template>
  <app-type>组件调用</app-type>
  <sun-style-provider :style-vars="styleVars">
    <sun-button block type="primary" @click="toggleTheme">点击改变样式</sun-button>
  </sun-style-provider>
  <app-type>函数调用</app-type>
  <sun-button block type="primary" @click="toggleRootTheme">切换根节点样式表</sun-button>
</template>

<script>
import { ref } from 'vue'
import StyleProvider from '../styleProvider'
import setStyle from '..'
import Button from '../../button/Button'
import AppType from '@varlet/cli/site/mobile/components/AppType'
// import BasicUse from './BasicUse'
// import ModifyColor from './ModifyColor'

export default {
  components: {
    [StyleProvider.name]: StyleProvider,
    AppType,
    [Button.name]: Button
  },
  setup () {
    const primaryTheme = {
      '--theme-name': 'primary',
      '--rate-primary-color': 'var(--color-primary)',
      '--button-primary-color': 'var(--color-primary)',
      '--switch-handle-active-background': 'var(--color-primary)',
      '--switch-track-active-background': 'var(--color-primary)',
    }
    const successTheme = {
      '--theme-name': 'success',
      '--rate-primary-color': 'var(--color-success)',
      '--button-primary-color': 'var(--color-success)',
      '--switch-handle-active-background': 'var(--color-success)',
      '--switch-track-active-background': 'var(--color-success)',
    }
    const styleVars = ref(primaryTheme)

    const toggleTheme = () => {
      styleVars.value = styleVars.value['--theme-name'] === 'primary' ? successTheme : primaryTheme
      console.log(styleVars.value)
    }
    let rootStyleVars = null
    const darkTheme = {
      '--color-primary': '#000',
    }
    const toggleRootTheme = () => {
      rootStyleVars = rootStyleVars ? null : darkTheme
      setStyle(rootStyleVars)
    }
    return {
      toggleTheme,
      styleVars,
      toggleRootTheme
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
