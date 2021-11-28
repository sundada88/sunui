<template>
  <div>
    <app-type>图标尺寸</app-type>
    <sun-icon name="checkbox-marked-circle"></sun-icon>
    <sun-icon name="checkbox-marked-circle" :size="26"></sun-icon>
    <app-type>图标颜色</app-type>
    <sun-icon color="#2979ff" name="checkbox-marked-circle"></sun-icon>
    <sun-icon name="checkbox-marked-circle" :size="26" color="#2979ff"></sun-icon>
    <app-type>使用图片</app-type>
    <sun-icon name="https://varlet.gitee.io/varlet-ui/cat.jpg" :size="32"></sun-icon>
    <app-type>注册事件</app-type>
    <sun-icon name="checkbox-marked-circle" color="#2979ff" @click="handleClick"></sun-icon>
    <app-type>图标切换动画(点击切换)</app-type>
    <sun-icon color="#2979ff" :name="name" :transition="300" :size="30" @click="toggle" />
    <app-type>图标列表(点击复制)</app-type>
    <div class="example__icons">
      <div
        v-tripple
        class="example__icon sun-elevation--2"
        v-for="iconName in icons"
        :key="iconName"
      >
        <sun-icon :name="iconName"></sun-icon>
        <div class="example__icon-name">{{ iconName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppType from '@varlet/cli/site/mobile/components/AppType'
import SunIcon from '../icon'
import { reactive, ref } from 'vue'
import icon from './icon.ts'
import tripple from '../../ripple/index'

export default {
  components: {
    AppType,
    SunIcon
  },
  directives: {
    tripple
  },
  setup () {
    const icons = reactive(icon)
    const handleClick = () => {
      console.log('点击成功')
    }
    const name = ref('information')
    const toggle = () => {
      name.value = name.value === 'information'
        ? 'checkbox-marked-circle'
        : 'information'
    }
    return { handleClick, name, toggle, icons }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/var.less";
.example {
  &__icons {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 29%;
    padding: 6% 5%;
    margin: 0 2% 4%;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    user-select: none;
    border-bottom: 2px solid @color-primary;
  }

  &__icon-name {
    width: 100%;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
  }
}
</style>