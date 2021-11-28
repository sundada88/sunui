import { defineComponent, PropType } from 'vue'
import './button.less'
import '../styles/common.less'
import { props } from './props'
import ripple from '../ripple/index'

export default defineComponent({
  name: 'SunButton',
  directives: {
    ripple,
  },
  props,
  // 定义的 props 属性 onClick 在编译的时候，会编译成 @click 事件，我们在外面监听事件可以通过 @click 监听
  /* 
    <button @click="handleClick"></button>
    <button :onClick="handleClick"></button>
    以上两种方法有相同的编译结果
  */
  setup(props, { slots }) {
    console.log('button setup')
    const handleClick = (e: Event) => {
      const { loading, disabled, onClick } = props
      if (loading || disabled) return
      onClick?.(e)
    }
    const handleTouchstart = (e: Event) => {
      const { loading, disabled, onTouchstart } = props
      if (loading || disabled) return
      onTouchstart?.(e)
    }

    return () => {
      const { text, color, type, block, size, outline, disabled, textColor, round } = props
      return (
        <button
          class={[
            'sun-button',
            'sun--box',
            `sun-button--${size}`,
            disabled ? 'sun-button--disabled' : null,
            text ? `sun-button--text-${type}` : `sun-button--${type}`,
            text && disabled ? 'sun-button--text-disabled' : null,
            block ? 'sun--flex sun-button--block' : 'sun--inline-flex',
            outline ? 'sun-button--outline' : null,
            text ? 'sun-button--text' : 'sun-elevation--1',
            round ? 'sun-button--round' : null,
          ]}
          style={{ background: color, color: textColor }}
          onClick={handleClick}
          onTouchstart={handleTouchstart}
          v-ripple={ripple}
        >
          {slots.default?.()}
        </button>
      )
    }
  },
})
