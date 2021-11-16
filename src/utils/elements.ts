import type { StyleVars } from '../style-provider/index'
import { kebabCase } from './share'

export function formatStyleVars(styleVars: StyleVars) {
  return Object.entries(styleVars ?? {}).reduce((styles, [key, value]) => {
    const cssVar = key.startsWith('--') ? key : `--${kebabCase(key)}`
    styles[cssVar] = value
    return styles
  }, {} as StyleVars)
}
