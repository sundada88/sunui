import Icon from '../index'
import example from '../example'
import SunIcon from '../icon'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { delay } from '../../utils/jest'

test('test icon example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test icon plugin', () => {
  const app = createApp({}).use(Icon)
  expect(app.component(Icon.name)).toBeTruthy()
})

test('test icon onClick', () => {
  const onClick = jest.fn()
  const wrapper = mount(SunIcon, {
    props: {
      onClick
    }
  })
  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

test('test icon transition name', async () => {
  const wrapper = mount(SunIcon, {
    props: {
      transition: 0,
      name: 'check'
    }
  })
  expect(wrapper.classes('sun-icon-check')).toBeTruthy()
  expect(wrapper.element.style.transition).toBe('all 0ms')
  await wrapper.setProps({
    transition: 300,
    name: 'error'
  })
  await delay(400)
  expect(wrapper.classes('sun-icon-error')).toBeTruthy()
  expect(wrapper.element.style.transition).toBe('all 300ms')
  wrapper.unmount()
})

test('test icon namespace', () => {
  const wrapper = mount(SunIcon, {
    props: {
      namespace: 'var-icon',
      name: 'error'
    }
  })
  expect(wrapper.classes('var-icon-error')).toBeTruthy()
})

test('test icon styles', () => {
  const wrapper = mount(SunIcon, {
    props: {
      color: '#000',
      size: '36px',
      name: 'check',
      transition: 0
    }
  })
  expect(wrapper.html()).toMatchSnapshot()
})
