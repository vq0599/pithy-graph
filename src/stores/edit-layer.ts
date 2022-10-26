import { reactive } from 'vue'

class EditLayerStore {
  private _data: {
    width: number,
    height: number,
  } = reactive({ width: 0, height: 0})

  public get data() {
    return this._data
  }

  setRect(width?: number, height?: number) {
    if (width) {
      this._data.width = width
    }
    if (height) {
      this._data.height = height
    }
  }
}

export const editLayerStore = new EditLayerStore()
