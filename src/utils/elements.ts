import { StyleVars } from '../style-provider/index'
import { isNumber, isString, kebabCase, toNumber } from './share'

// example 1rem
export const isRem = (value: unknown): value is string => isString(value) && value.endsWith('rem')

// example 1 || 1px
export const isPx = (value: unknown): value is string | number =>
  (isString(value) && value.endsWith('px')) || isNumber(value)

// example 1%
export const isPercent = (value: unknown): value is string => isString(value) && value.endsWith('%')

// example 1vw
export const isVw = (value: unknown): value is string => isString(value) && value.endsWith('vw')

// example 1vh
export const isVh = (value: unknown): value is string => isString(value) && value.endsWith('vh')

export function formatStyleVars (styleVars: StyleVars) {
  return Object.entries(styleVars ?? {}).reduce((styles, [key, value]) => {
    const cssVar = key.startsWith('--') ? key : `--${kebabCase(key)}`
    styles[cssVar] = value
    return styles
  }, {} as StyleVars)
}

export const toPxNum = (value: unknown): number => {
  if (isNumber(value)) {
    return value
  }

  if (isPx(value)) {
    return +(value as string).replace('px', '')
  }

  if (isVw(value)) {
    return (+(value as string).replace('vw', '') * window.innerWidth) / 100
  }

  if (isVh(value)) {
    return (+(value as string).replace('vh', '') * window.innerHeight) / 100
  }

  if (isRem(value)) {
    const num = +(value as string).replace('rem', '')
    const rootFontSize = window.getComputedStyle(document.documentElement).fontSize

    return num * parseFloat(rootFontSize)
  }

  if (isString(value)) {
    return toNumber(value)
  }

  // % and other
  return 0
}

export const toSizeUnit = (value: unknown) => {
  if (!value) {
    return undefined
  }
  if (isPercent(value) || isVw(value) || isVh(value) || isRem(value)) {
    return value
  }

  return `${toPxNum(value)}px`
}
