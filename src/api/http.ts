import axios from 'axios'
import { ENV_API_HOST } from '@/utils/env';

export const http = axios.create({
  baseURL: `${ENV_API_HOST}/api/v1`,
});