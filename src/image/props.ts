import { PropType } from "@vue/runtime-core"

const fitValidator = (fit: string) => {
  return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(fit)
}
export default {
  src: {
    type: String
  },
  fit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    validator: fitValidator,
    default: 'fill'
  },
  alt: {
    type: String
  },
  width: {
    type: [Number, String]
  },
  height: {
    type: [Number, String]
  },
  radius: {
    type: [Number, String]
  },
  lazy: {
    type: Boolean,
    default: false
  },
  loading: {
    type: String,
  },
  error: {
    type: String
  },
  ripple: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function as PropType<(e: Event) => void>
  },
  onLoad: {
    type: Function as PropType<(e: Event) => void>
  },
  onError: {
    type: Function as PropType<(e: Event) => void>
  }
}