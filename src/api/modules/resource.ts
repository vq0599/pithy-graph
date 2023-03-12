import { http } from '../http';
import { IResource } from '@/structs';
import mime from 'mime';
import { AxiosResponse } from 'axios';
import { memoize } from 'lodash-es';

const parseFileType = async (response: Promise<AxiosResponse<IResource[]>>) => {
  (await response).data.forEach((source) => {
    source.mimeType = mime.getType(source.fileType.slice(1)) || '';
  });
  return response;
};

export const ResourceAPI = {
  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return http.post('/resource/upload', form);
  },
  getImageList() {
    return parseFileType(
      http.get<IResource[]>(`/resource?extList=.jpg,.jpeg,.png,.webp`)
    );
  },
  getVideoList() {
    return parseFileType(http.get<IResource[]>(`/resource?extList=.mp4`));
  },
  getMediaList() {
    const exts = ['.jpg,.jpeg,.png,.webp,.mp4'];
    return parseFileType(
      http.get<IResource[]>(`/resource?extList=${exts.join()}`)
    );
  },
  /**
   * 获取图片信息
   */
  getImageInfo: memoize(async (url: string) => {
    const response = await http.get(`${url}?x-oss-process=image/info`);
    const source = response.data;
    const data = {
      height: Number(source.ImageHeight.value),
      width: Number(source.ImageWidth.value),
      size: Number(source.FileSize.value),
    };
    response.data = data;
    return response as AxiosResponse<typeof data>;
  }),
};
