import StyleProvider from '../index'
import SunStyleProvider from '../styleProvider.tsx'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { delay } from '../../utils/jest'

test('test styleProvider component plugin', () => {
  const app = createApp({}).use(StyleProvider)
  expect(app.component(StyleProvider.Component.name)).toBeTruthy()
})

test('test styleProvider plugin', () => {
  // 因为在引入 ../index.ts 的时候，已经给 SunStyleProvider 上面添加了 install 属性
  const app = createApp({}).use(SunStyleProvider)
  expect(app.component(SunStyleProvider.name)).toBeTruthy()
})

test('test styleProvider render correct', () => {
  const wrapper = mount(SunStyleProvider)
  expect(wrapper.find('sun-style-provider')).toBeTruthy()
})

test('test styleProvider slots render correct', () => {
  const _default = '<div>slot test</div>'
  const wrapper = mount(SunStyleProvider, {
    slots: {
      default: _default
    }
  })
  expect(wrapper.html()).toContain(_default)
  wrapper.unmount()
})

test('test styleProvider functional', async () => {
  StyleProvider({
    'cell-font-size': '30px'
  })
  await delay(0)
  expect(getComputedStyle(document.documentElement).getPropertyValue('--cell-font-size')).toBe('30px')
})

test('test styleProvider component', async () => {
  const wrapper = mount(SunStyleProvider)
  const el = wrapper.find('.sun-style-provider')
  expect(el.exists()).toBeTruthy()
  await wrapper.setProps({
    styleVars: {
      'cell-font-size': '30px'
    }
  })
  expect(el.attributes('style')).toBe('--cell-font-size: 30px;')
})
