import { formatStyleVars } from '../utils/elements'
import SunStyleProvider from './styleProvider'
import type { App } from 'vue'

export type StyleVars = Record<string, string>

const mountedVarKeys: string[] = []
function StyleProvider(styleVars: StyleVars = {}) {
  mountedVarKeys.forEach((key) => document.documentElement.style.removeProperty(key))
  mountedVarKeys.length = 0

  const styles: StyleVars = formatStyleVars(styleVars)
  Object.entries(styles).forEach(([key, value]) => {
    console.log('key', key, value)
    document.documentElement.style.setProperty(key, value)
    mountedVarKeys.push(key)
  })
}

StyleProvider.Component = SunStyleProvider
SunStyleProvider.install = function (app: App) {
  app.component(SunStyleProvider.name, SunStyleProvider)
}
StyleProvider.install = function (app: App) {
  app.component(SunStyleProvider.name, SunStyleProvider)
}

export const _StyleProviderComponent = SunStyleProvider

export default StyleProvider
