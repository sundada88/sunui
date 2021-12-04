import Cell from '../index'
import example from '../example'
import SunCell from '../cell'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test cell example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test cell plugin', () => {
  const app = createApp({}).use(Cell)
  expect(app.component(Cell.name)).toBeTruthy()
})

test('test cell props', () => {
  const title = 'This is Cell'
  const desc = 'This is desc'
  const iconClass = 'test-icon-class'
  const titleClass = 'test-title-class'
  const descClass = 'test-desc-class'
  const extraClass = 'test-extra-class'
  const icon = 'fire'
  const wrapper = mount(SunCell, {
    props: {
      title,
      desc,
      border: true,
      iconClass,
      titleClass,
      descClass,
      extraClass,
      icon
    }
  })
  expect(wrapper.classes('sun-cell')).toBeTruthy()
  expect(wrapper.find('.sun-icon').classes('sun-icon-fire')).toBeTruthy()
  expect(wrapper.classes('sun-cell--border')).toBeTruthy()
  expect(wrapper.find('.sun-cell__title').text()).toBe(title)
  expect(wrapper.find('.sun-cell__desc').text()).toBe(desc)
  expect(wrapper.find(iconClass)).toBeTruthy()
  expect(wrapper.find(titleClass)).toBeTruthy()
  expect(wrapper.find(descClass)).toBeTruthy()
  expect(wrapper.find(extraClass)).toBeTruthy()
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
