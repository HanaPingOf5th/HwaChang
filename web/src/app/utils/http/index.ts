import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

export interface APIResponseType{
  isSuccess: boolean,
  isFailure: boolean
  data: unknown
}

export const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

instance.interceptors.request.use(
  function (config) {
    const token = cookies().get('token').value;
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
