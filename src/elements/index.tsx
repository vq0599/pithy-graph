import { defineComponent, PropType } from "vue";
import PithyText from './text'
import PithyImage from './image'
import { IElement } from "@/structs";
import PithyWrapper from './wrapper'

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
  methods: {
    renderElement() {
      const { data } = this
      switch (data.type) {
        case 'TEXT':
          return <PithyText data={data} />
        case 'IMAGE':
          return <PithyImage data={data} />
        default:
          return null
      }
    }
  },
  render() {
    const { data, index } = this
    return (
      <PithyWrapper data={data} index={index}>
        {this.renderElement()}
      </PithyWrapper>
    )
    
  }
})