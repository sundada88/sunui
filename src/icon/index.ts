import { App } from 'vue'
import Icon from './icon'

Icon.install = (app: App) => {
  app.component(Icon.name, Icon)
}

export const _IconComponent = Icon

export default Icon
