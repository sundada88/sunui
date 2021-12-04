import { defineComponent } from 'vue';
import { toSizeUnit } from '../utils/elements';
import Ripple from '../ripple';
import props from './props';

export default defineComponent({
  name: 'SunImage',
  directives: {
    Ripple
  },
  props,
  setup(props) {
    return () => <div class={ ["sun-image", "sun-box", { 'sun--inline-block': !props.block }] }
      v-ripple={ { disabled: !props.ripple } }
      style={ { width: toSizeUnit(props.width), height: toSizeUnit(props.height), borderRadius: toSizeUnit(props.radius) } }>
      <img class="sun-image_image" src="" alt={props.alt} />
      <div></div>
    </div>
  }
})