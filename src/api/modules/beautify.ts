import axios from 'axios';

interface AIResponse {
  sourceSlideId: number;
  result: Array<{
    templateSlideId: number;
    elements: Array<{ sourceElementId: number; templateElementId: number }>;
  }>;
}

export const BeautifyAPI = {
  match(slideId: number) {
    return axios.post<{ data: AIResponse }>(
      `https://www.jianxing.top/ai/match?sid=${slideId}`
    );
  },
};
