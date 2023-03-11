export interface IVoice {
  id: number;
  nickname: string;
  gender: 'male' | 'female';
  code: string;
  previewUrl: string;
  country: string;
  language: string;
  scene: string;
  tags: string;
}
