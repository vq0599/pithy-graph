// Omit并没有严格的类型限制，参考：https://jishuin.proginn.com/p/763bfbd7469c
declare type Remove<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 递归可选
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
