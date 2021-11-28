import { App } from 'vue'
import Cell from './cell'

Cell.install = (app: App) => {
  app.component(Cell.name, Cell)
}

export const _CellComponent = Cell

export default Cell
