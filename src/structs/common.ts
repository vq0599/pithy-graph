import { IElementTypes } from '@/core';

export interface MediaSelectOptions {
  url: string;
  naturalHeight: number;
  naturalWidth: number;
  type: Extract<IElementTypes, 'IMAGE' | 'VIDEO'>;
}
