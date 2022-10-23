import { defineComponent, PropType, CSSProperties } from "vue";
import { IEImage } from '@/structs'
import './index.scss'

export default defineComponent({
  name: 'pithy-element-image',
  props: {
    payload: {
      type: Object as PropType<IEImage['payload']>,
      required: true
    }
  },
  computed: {
    styles(): CSSProperties {
      return {
       
      }
    },
  },
  render() {
    const { url } = this.payload
    return (
      <div class="pithy-element-image">
        <img src={url} />
      </div>
    )
  }
})