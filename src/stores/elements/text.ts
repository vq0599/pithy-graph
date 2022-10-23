import { ElementBaseStore } from './base'
import { IEText } from "@/structs";

export class TextStore extends ElementBaseStore<IEText> {
  setContent(content: string) {
    this._data.payload.content = content
  }
}