export interface IVoice {
  id: number;
  nickname: string;
  gender: 'male' | 'female';
  previewUrl: string;
  country: string;
  avatarUrl: string;
  language: string;
  scene: string;
  tags: string;
}
