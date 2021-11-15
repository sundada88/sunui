<template>
  <sun-button color="#03A9F4">组件库从我开始</sun-button>
</template>

<script>
import Button from '..'

export default {
  name: 'ModifyColor',
  components: {
    [Button.name]: Button
  }
}
</script>
