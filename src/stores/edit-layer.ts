import { reactive } from 'vue'

export class EditLayerStore {
  private _data: {
    width: number,
    height: number,
  } = { width: 0, height: 0}

  public get data() {
    return this._data
  }

  setRect(width: number, height: number) {
    this._data.width = width
    this._data.height = height
  }
}

export const editLayerStore = reactive(new EditLayerStore())
