/// <reference types="vite/client" />

/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.module.scss' {
  export const sidebarWidth: string
  export const headerWidth: string
  export const canvasRatio: number
  export const canvasNaturalWidth: string
  export const canvasNaturalHeight: string
}