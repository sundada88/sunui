import { defineComponent } from 'vue'
import { props } from './props'

export default defineComponent({
  name: 'SunIcon',
  props,
  setup () {
    return () => <component class='sun-icon' is={props.name}></component>
  }
})
