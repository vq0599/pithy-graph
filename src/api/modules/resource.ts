import { http } from '../http';
import { IResource } from '@/structs';
import mime from 'mime';
import { AxiosResponse } from 'axios';

const parseFileType = async (response: Promise<AxiosResponse<IResource[]>>) => {
  (await response).data.forEach((source) => {
    source.mimeType = mime.getType(source.fileType.slice(1)) || '';
  });
  return response;
};

export const ResourceAPI = {
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
};
