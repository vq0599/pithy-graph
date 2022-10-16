import { defineComponent, PropType } from "vue";
import { IImage } from '@/structs'
import './index.scss'

export default defineComponent({
  name: 'pithy-element-picture',
  props: {
    data: {
      type: Object as PropType<IImage>,
      required: true
    }
  },
  render() {
    const { id } = this.data
    return <div class="pithy-element-text">{id}</div>
  }
})