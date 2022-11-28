import { ISlide } from '@/core';

export interface IWorkspace {
  id: number;
  slides: ISlide[];
  title: string;
  createdAt: number;
  updatedAt: number;
}
