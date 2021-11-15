import { PropType } from 'vue'

const typeValidator = (type: string): boolean => {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type)
}
const sizeValidator = (type: string): boolean => {
  return ['normal', 'mini', 'small', 'large'].includes(type)
}
export const props = {
  color: {
    type: String,
  },
  type: {
    type: String as PropType<'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'>,
    default: 'default',
    validator: typeValidator,
  },
  onClick: {
    type: Function as PropType<(e: Event) => void>,
  },
  onTouchstart: {
    type: Function as PropType<(e: Event) => void>,
  },
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'normal' | 'mini' | 'small' | 'large'>,
    default: 'normal',
    validator: sizeValidator,
  },
  text: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textColor: {
    type: String,
  },
  round: Boolean,
  loading: Boolean,
}
