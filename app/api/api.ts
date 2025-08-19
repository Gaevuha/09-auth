//app/api/api.tsx

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
