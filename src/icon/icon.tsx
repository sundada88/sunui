import { h, watch, defineComponent, Ref, ref, nextTick } from 'vue'
import { isURL, toNumber } from '../utils/share'
import { props } from './props'
import './index.less'
import '../styles/common.less'
import { toSizeUnit } from '../utils/elements'

export default defineComponent({
  name: 'SunIcon',
  components: {},
  props,
  setup (props) {
    const nextName: Ref<undefined | string> = ref('')
    const shrinking: Ref<boolean> = ref(false)
    const handleNameChange = async (newName: string | undefined, oldName: string | undefined) => {
      const { transition } = props
      if (!oldName || toNumber(transition) === 0) {
        nextName.value = newName
        return
      }
      shrinking.value = true
      await nextTick()
      setTimeout(() => {
        oldName != null && (nextName.value = newName)
        shrinking.value = false
      }, toNumber(transition))
    }
    watch(() => props.name, handleNameChange, { immediate: true })
    return () =>
      h(isURL(props.name) ? 'img' : 'i', {
        class: [
          'sun-icon',
          `${props.namespace}--set`,
          isURL(props.name) ? 'sun-icon__image' : `${props.namespace}-${nextName.value}`,
          {
            'sun-icon--shrinking': shrinking.value
          }
        ],
        onClick: props.onClick,
        src: isURL(props.name) ? props.name : null,
        style: {
          fontSize: props.size ? toSizeUnit(props.size) : null,
          color: props.color || null,
          width: isURL(props.name) ? toSizeUnit(props.size) : null,
          height: isURL(props.name) ? toSizeUnit(props.size) : null,
          transition: `all ${toNumber(props.transition)}ms`
        }
      })
  }
})
