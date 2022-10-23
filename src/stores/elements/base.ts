import { IElement } from "@/structs";

export class ElementBaseStore<T extends IElement> {
  protected _data: T
  constructor(data: T) {
    this._data = data
  }

  setPos(x: number, y: number) {
    this._data.x = x
    this._data.y = y
  }
}