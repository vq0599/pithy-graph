import { reactive } from 'vue';
import { IElementTypes } from '@/structs';

interface GlobalState {
  menuVisible: Record<IElementTypes, boolean>
}

class GlobalStore {
  private _data: GlobalState = reactive({
    menuVisible: {
      TEXT: false,
      IMAGE: false,
      SHAPE: false,
    },
  });

  get menuVisible() {
    return this._data.menuVisible;
  }

  public get data() {
    return this._data;
  }

  closeMenu(key: IElementTypes) {
    this.menuVisible[key] = false;
  }
}

export const globalStore = new GlobalStore();
