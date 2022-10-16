import { defineComponent, PropType } from "vue";
import PithyText from './text'
import { IElement } from "@/structs";

export const PithyElement =  defineComponent({
  name: 'PithyElement',
  props: {
    data: {
      type: Object as PropType<IElement>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  render() {
    const { data, index } = this
    switch (data.type) {
      case 'TEXT':
        return <PithyText data={data} index={index}/>
    
      default:
        return null
    }
  }
})