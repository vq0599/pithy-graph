import { defineComponent, PropType, CSSProperties } from "vue";
import { IImage } from '@/structs'
import './index.scss'

export default defineComponent({
  name: 'pithy-element-image',
  props: {
    data: {
      type: Object as PropType<IImage>,
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
    const { url } = this.data
    return (
      <div class="pithy-element-image">
        <img src={url} />
      </div>
    )
  }
})