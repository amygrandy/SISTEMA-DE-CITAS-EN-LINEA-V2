import axios from 'axios';
import { DEFAULTS } from '../const/env.js';

export const api = axios.create({
  baseURL: DEFAULTS.BD_SIAIS,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': DEFAULTS.SIAIS_API_KEY,
  },
});
