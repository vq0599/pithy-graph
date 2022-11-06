type AnyFunction = (...args: any[]) => any;

class Emitter<T extends Record<keyof T, AnyFunction>> {
  store: { [K in keyof T]?: Array<T[K]> } = {};
  on<K extends keyof T>(event: K, callback: T[K]) {
    const queue = this.store[event];
    if (Array.isArray(queue)) {
      queue.push(callback);
    } else {
      this.store[event] = [callback];
    }
  }
  off<K extends keyof T>(event: K, callback: T[K]) {
    const queue = this.store[event];
    if (Array.isArray(queue)) {
      this.store[event] = queue.filter((cb) => cb !== callback);
    }
  }
  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    const callbacks = this.store[event];
    callbacks?.forEach((cb) => {
      cb.call(undefined, ...args);
    });
  }
}

interface EventMap {
  drag: (id: number) => void;
}
export const emitter = new Emitter<EventMap>();
