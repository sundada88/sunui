import '../styles/common.less'
import { defineComponent } from 'vue'
import { PropType } from 'vue'
import { formatStyleVars } from '../utils/elements'
import { StyleVars } from './index'
export default defineComponent({
  name: 'SunStyleProvider',
  props: {
    styleVars: {
      type: Object as PropType<StyleVars>,
      default: () => {},
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="sun-style-provider" style={formatStyleVars(props.styleVars)}>
        {slots.default?.()}
      </div>
    )
  },
})
