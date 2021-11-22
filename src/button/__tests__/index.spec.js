// import example from '../example'
import Button from '..'
import SunButton from '../Button'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test button plugin', () => {
  const app = createApp({}).use(Button)
  expect(app.component(Button.name)).toBeTruthy()
})

test('test button onClick && onTouchstart null callback', () => {
  const wrapper = mount(SunButton, {
    props: {
      onClick (e) {}
    }
  })
  wrapper.trigger('click')
  wrapper.trigger('touchstart')
  expect(wrapper.emitted()).toHaveProperty('click')
  expect(wrapper.emitted()).toHaveProperty('touchstart')
  wrapper.unmount()
})

test('test button onClick && onTouchstart', () => {
  const onClick = jest.fn()
  const onTouchstart = jest.fn()

  const wrapper = mount(SunButton, {
    props: {
      onClick,
      onTouchstart
    }
  })

  wrapper.trigger('click')
  wrapper.trigger('touchstart')
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onTouchstart).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

test('test button disabled', () => {
  const onClick = jest.fn()
  const onTouchstart = jest.fn()
  const wrapper = mount(SunButton, {
    props: {
      onClick,
      onTouchstart,
      disabled: true
    }
  })
  wrapper.trigger('click')
  wrapper.trigger('touchstart')
  expect(wrapper.classes()).toContain('sun-button--disabled')
  expect(onClick).toHaveBeenCalledTimes(0)
  expect(onTouchstart).toHaveBeenCalledTimes(0)
  // expect(wrapper.html()).toMatchSnapshots()
  wrapper.unmount()
})

test('test button color & textColor', () => {
  const wrapper = mount(SunButton, {
    props: {
      color: '#000',
      textColor: '#000'
    }
  })
  expect(wrapper.attributes('style')).toMatch('color: rgb(0, 0, 0)')
  expect(wrapper.attributes('style')).toMatch('background: rgb(0, 0, 0)')
  // expect(wrapper.html()).toMatchSnapshots()
  wrapper.unmount()
})

test('test button type', () => {
  const _default = 'button text'
  const wrapper = mount(SunButton, {
    props: {
      size: 'large',
      round: true,
      text: true,
      block: true
    },
    slots: {
      default: _default
    }
  })
  expect(wrapper.classes()).toContain('sun-button--large')
  expect(wrapper.classes()).toContain('sun-button--round')
  expect(wrapper.classes()).toContain('sun-button--text')
  expect(wrapper.classes()).toContain('sun-button--block')
  expect(wrapper.text()).toBe(_default)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test button text && disabled', () => {
  const wrapper = mount(SunButton, {
    props: {
      disabled: true,
      text: true
    }
  })
  expect(wrapper.classes('sun-button--text-disabled')).toBeTruthy()
  wrapper.unmount()
})

test('test button outline', () => {
  const wrapper = mount(SunButton, {
    props: {
      outline: true
    }
  })
  expect(wrapper.classes('sun-button--outline')).toBeTruthy()
  wrapper.unmount()
})
