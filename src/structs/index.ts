import type { IImage } from "./image";
import type { ISHAPE } from "./shape";
import type { IText } from "./text";

export * from "./image";
export * from "./shape";
export *from "./text";


export type IElement = IImage | ISHAPE | IText