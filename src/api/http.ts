import axios from 'axios';
import { ENV_API_HOST } from '@/utils/env';
import { useStorage } from '@vueuse/core';
import { STORAGE_TOKEN_KEY } from '@/utils/constants';

export const http = axios.create({
  baseURL: `${ENV_API_HOST}/api/v2`,
});

http.interceptors.request.use((config) => {
  const tokenRef = useStorage(STORAGE_TOKEN_KEY, '');
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${tokenRef.value}`;
  }
  return config;
});
