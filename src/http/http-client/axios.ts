import axios from 'axios';
import { getCookie } from 'cookies-next';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: 'Bearer ' + getCookie('authToken')
  }
})
