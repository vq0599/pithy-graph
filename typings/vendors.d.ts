/// <reference types="vite-svg-loader" />

declare module '*.module.scss' {
  export const sidebarWidth: string;
  export const headerWidth: string;
  export const canvasRatio: number;
  export const canvasNaturalWidth: string;
  export const canvasNaturalHeight: string;
  export const optionsPanelWidth: string;
}

declare module '@ckpack/vue-color' {
  const Chrome: any;
}
