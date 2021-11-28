<template>
  <div>
    <app-type>基本使用</app-type>
    <sun-cell>这是单元格</sun-cell>
    <sun-cell>这是单元格</sun-cell>
    <app-type>显示图标</app-type>
    <sun-cell icon="fire" title="这是单元格">
      <template #extra>
        <sun-icon name="information" />
      </template>
    </sun-cell>
    <sun-cell title="这是单元格">
      <template #icon>
        <sun-icon name="fire"></sun-icon>
      </template>
      <template #extra>
        <sun-icon name="information" />
      </template>
    </sun-cell>
    <app-type>显示描述</app-type>
    <sun-cell icon="fire" title="这是单元格" desc="描述">
      <template #extra>
        <sun-icon name="information" />
      </template>
    </sun-cell>
    <sun-cell icon="fire" title="这是单元格">
      <template #desc>描述</template>
      <template #extra>
        <sun-icon name="information" />
      </template>
    </sun-cell>
    <sun-cell title="这是单元格">
      <template #desc>描述</template>
      <template #extra>
        <sun-icon name="information" />
      </template>
    </sun-cell>
    <app-type>显示边框</app-type>
    <sun-cell title="这是单元格" border></sun-cell>
    <sun-cell border>这是单元格</sun-cell>
  </div>
</template>

<script>
import AppType from '@varlet/cli/site/mobile/components/AppType'
import SunCell from '../cell'
import SunIcon from '../../icon'

export default {
  components: {
    SunCell,
    AppType,
    SunIcon
  },
  setup () {


    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>