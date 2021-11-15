import { defineComponent } from 'vue'
import './index.less'
function createRipple1 (this: HTMLElement, e: TouchEvent): void {
  console.log(e)
  const { left, top } = this.getBoundingClientRect()
  const { clientHeight, clientWidth } = this
  const radius = Math.sqrt(clientHeight ** 2 + clientWidth ** 2) / 2
  const size = radius * 2
  const localX = e.touches[0].clientX - left
  const localY = e.touches[0].clientY - top
  const ripple = this.querySelector('.sun-ripple')
  if (ripple) {
    this.removeChild(ripple)
  }
  const div = document.createElement('div')
  this.appendChild(div)
  div.classList.add('sun-ripple')
  div.style.opacity = '0'
  div.style.width = `${size}px`
  div.style.height = `${size}px`
  div.style.transform = `translate(${localX - radius}px, ${localY - radius}px) scale3d(.3, .3, .3)`
  const centerX = (clientWidth - radius * 2) / 2
  const centerY = (clientHeight - radius * 2) / 2
  setTimeout(() => {
    div.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`
  })
}

function createRipple (this: HTMLElement, e: TouchEvent): void {
  const { left, top, width, height } = this.getBoundingClientRect()
  const radius = Math.sqrt(width ** 2 + height ** 2) / 2
  const size = radius * 2
  const localX = e.touches[0].clientX - left
  const localY = e.touches[0].clientY - top
}
const test = {
  mounted (el: HTMLElement) {
    el.addEventListener('touchstart', createRipple, { passive: true })
  }
}
export default defineComponent({
  name: 'SunStyleProvider',
  directives: {
    test
  },
  setup (props) {
    return () => (
      <div
        v-test
        style={{ width: '100px', height: '50px', backgroundColor: 'pink', position: 'relative', overflow: 'hidden' }}
      >
        {/* <div
          style={{ position: 'absolute', left: '10px', top: '10px', width: '20px', height: '20px', background: 'blue' }}
        ></div> */}
      </div>
    )
  }
})
