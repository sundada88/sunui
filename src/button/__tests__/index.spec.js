// import example from '../example'
import Button from '..'
import SunButton from '../Button'
import {createApp} from 'vue'
import { mount } from '@vue/test-utils'

test('test button plugin', () => {
  const app = createApp({}).use(Button)
  expect(app.component(Button.name)).toBeTruthy()
})

test('test button onClick && onTouchstart null callback', () => {
  console.log(123)
  const wrapper = mount(SunButton, {
    props: {
      onClick(e) {
        console.log('onclickonclickonclickonclickonclick')
      }
    }
  })
  wrapper.trigger('click')
  wrapper.trigger('touchstart')
  wrapper.unmount()
})

test('test button onClick && onTouchstart', () => {
  const onClick = jest.fn()
  const onTouchstart = jest.fn()

  const wrapper = mount(SunButton, {
    props: {
      onClick,
      onTouchstart,
    },
  })

  wrapper.trigger('click')
  wrapper.trigger('touchstart')
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onTouchstart).toHaveBeenCalledTimes(1)
})