<template>
  <h1>a</h1>
  <!-- ```vue
    import BasicUse from '../example/BasicUse'
    ``` -->
</template>

<script>
import Button from '../Button'

export default {
  name: 'BasicUse',
  components: {
    [Button.name]: Button
  }
}
</script>
