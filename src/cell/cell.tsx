import { defineComponent } from 'vue'
import SunIcon from '../icon/icon'
import props from './props'
import '../styles/common.less'
import './index.less'

export default defineComponent({
  name: 'SunCell',
  components: {
    SunIcon
  },
  props,
  setup (props, { slots }) {
    const { titleClass, iconClass, descClass, extraClass, border } = props
    return () => (
      <div class={['sun-cell', { 'sun-cell--border': border }]}>
        {props.icon || slots.icon ? (
          <div class={['sun-cell__icon', { iconClass }]}>
            {slots.icon ? slots.icon() : <sun-icon class='sun-flex' name={props.icon}></sun-icon>}
          </div>
        ) : (
          ''
        )}
        <div class='sun-cell__content'>
          <div class={['sun-cell__title', titleClass]}>{slots.default ? slots.default() : props.title}</div>
          <div class={['sun-cell__desc', descClass]}>{slots.desc ? slots.desc() : props.desc}</div>
        </div>
        <div class={['sun-cell__extra', extraClass]}> {slots.extra ? slots.extra() : ''}</div>
      </div>
    )
  }
})
