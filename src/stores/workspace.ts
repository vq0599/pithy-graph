import { WorkspaceAPI } from '@/api'
import { IWorkspace } from '@/structs'
import { reactive } from 'vue'

class WorkspaceStore {
  private _data: IWorkspace = {} as IWorkspace

  public get data() {
    return this._data
  }

  async initialize(id: number) {
    const { data } = await WorkspaceAPI.getOne(id)
    this._data = data
    return this.data
  }

  appendSlide() {
    // const newSlide: ISlide = {
    //   id: this.id++,
    //   elements: [],
    //   background: {},
    // }
    // this._data.slides.push(newSlide)
  }
  deleteSlide(index: number) {
    // this._data.slides.splice(index, 1)
    // if (index === this.slides.length - 1) {
    //   this._current --;
    // }
  }
}

export const workspaceStore = reactive(new WorkspaceStore())