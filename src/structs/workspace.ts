import { ISlide } from './slide';

export interface IWorkspace {
  id: number;
  slides: ISlide[];
  title: string;
  createdAt: number;
  updatedAt: number;
}
