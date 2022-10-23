import { ElementBaseStore } from './base'
import { IEImage } from "@/structs";

export class ImageStore extends ElementBaseStore<IEImage> {
  setFilter(filter: string) {
    console.log(filter);
  }
}