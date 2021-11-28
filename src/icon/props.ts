import { PropType } from 'vue'

export const props = {
  name: String,
  size: [Number, String],
  color: String,
  namespace: {
    type: String,
    default: 'sun-icon'
  },
  transition: {
    type: [Number, String],
    default: 0
  },
  onClick: {
    type: Function as PropType<(e: Event) => void>
  }
}
