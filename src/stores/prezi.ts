import { IImage, IText } from '@/structs'
import { ISlide } from '@/structs/prezi'
import { reactive } from 'vue'

const text: IText = {
  type: 'TEXT',
  id: 'fdhue29fh',
  width: 680,
  x: 50,
  y: 50,
  content: '<p>hello world</p>',
  level: 'H1',
  bold: false,
  fontSize: 3,
  rotate: 0,
  italic: false,
  order: 1,
  alignment: 'center',
  color: 'red',
}

const text2: IText = {
  type: 'TEXT',
  id: 'cie830dfh73',
  width: 680,
  x: 350,
  y: 350,
  content: '<p>world hello</p>',
  level: 'H1',
  bold: false,
  fontSize: 2,
  rotate: 0,
  italic: true,
  order: 1,
  alignment: 'center',
  color: 'red',
}

// const image: IImage = {
//   type: 'IMAGE',
//   id: 'c93hd63hd8sd',
//   width: 680,
//   height: 315,
//   x: 350,
//   y: 350,
// }

class PreziStore {
  slides: ISlide[] = [
    { id: 0, elements: [text, text2] },
    { id: 1, elements: [
      
    ] },
  ]
  private _current = 0
  private id = 2
  get currentSlide() {
    return this.slides[this._current]
  }
  setSlides(slides: ISlide[]) {
    this.slides = slides
  }
  focusSlide(current: number) {
    this._current = current
  }
  appendSlide() {
    const newSlide: ISlide = {
      id: this.id++,
      elements: []
    }
    this.slides.push(newSlide)
  }
  deleteSlide(index: number) {
    this.slides.splice(index, 1)
    if (index === this.slides.length - 1) {
      this._current --;
    }
  }
}

export const preziStore = reactive(new PreziStore())