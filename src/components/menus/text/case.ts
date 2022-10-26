import { IETextPayload } from "@/structs";

export const H1: Partial<IETextPayload> = {
  fontSize: 3.6,
  level: 'H1',
  content: '<p>添加文本</p>',
}

export const H2: Partial<IETextPayload> = {
  fontSize: 3,
  level: 'H2',
  content: '<p>添加文本</p>',
}

export const H3: Partial<IETextPayload> = {
  fontSize: 2.4,
  level: 'H3',
  content: '<p>添加文本</p>',
}

export const P: Partial<IETextPayload> = {
  fontSize: 1,
  level: 'P',
  content: '<p>添加文本</p>',
}

export const SP: Partial<IETextPayload> = {
  fontSize: 0.8,
  level: 'SP',
  content: '<p>添加文本</p>',
}

export const OL: Partial<IETextPayload> = {
  fontSize: 1,
  level: 'UL',
  content: '<ol><li>添加文本</li></ol>',
}

export const UL: Partial<IETextPayload> = {
  fontSize: 1,
  level: 'UL',
  content: '<ul><li>添加文本</li></ul>',
}