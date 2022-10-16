import { defineComponent } from "vue";
import './index.scss'

const list = [
{
  width: 300,
  height: 200,
  url: "https://hellorfimg.zcool.cn/provider_image/preview260/hi2242052247.jpg",
},
{
  width: 300,
  height: 200,
  url: "https://hellorfimg.zcool.cn/provider_image/preview260/hi2242061081.jpg",
},
{
  width: 300,
  height: 200,
  url: "https://ali.image.hellorf.com/images/a7156c66d446a2a03bb380878b0f4dd1.jpeg",
},
{
  width: 300,
  height: 200,
  url: "https://ali.image.hellorf.com/images/53ab5c48fab1450ea405d9e002a8c155.jpeg",
},
{
  width: 300,
  height: 200,
  url: "https://ali.image.hellorf.com/images/32d9954cbc35dadad044ce2e9cfb8f77.jpeg",
},
{
  width: 300,
  height: 200,
  url: "https://ali.image.hellorf.com/images/96b7faa42b5d064b996638fbe0605fad.jpeg",
},
{
  width: 300,
  height: 200,
  url: "https://ali.image.hellorf.com/images/8af4d6b284d0a292eed67ac6435e881a.jpeg",
},
{
  width: 300,
  height: 200,
  url: "https://hellorfimg.zcool.cn/provider_image/preview260/hi2242027171.jpg",
},
]
export default defineComponent({
  name: 'pithy-picture-menu',
  render() {
    return (
      <div class="pithy-picture-menu">
        {
          list.map(v => (
            <img width={100} src={v.url} alt="" />
          ))
        }
      </div>
    )
  },
  methods: {
    
  }
})