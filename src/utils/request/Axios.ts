import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios'
import qs from 'qs'
import { cloneDeep } from 'lodash-es';

import { AxiosCanceler } from './AxiosCanceler'

export class HttpRequest{

  private axiosInstance: AxiosInstance
  private options

  constructor (options: any) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // ignoreCancelToken：忽略重复请求
      const { headers: { ignoreCancelToken } } = config
      
      !ignoreCancelToken && axiosCanceler.addPending(config)
      
      // 请求之前处理config
      // const token = getToken();
      const token = '123';
      if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
        // jwt token
        (config as Recordable).headers.Authorization = this.options.authenticationScheme
          ? `${this.options.authenticationScheme} ${token}`
          : token;
      }
      return config;
    })

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      return res;
    });
  }

  get<T = any>(config: AxiosRequestConfig, options?: any): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  request<T = any>(config: AxiosRequestConfig, options?: any): Promise<T> {
    let conf: any = cloneDeep(config);

    // const { requestOptions } = this.options;
    // const opt: any = Object.assign({}, requestOptions, options);

    return new Promise((resolve, reject) => {
      this.axiosInstance.request(conf)
      .then((res: any) => {
        resolve(res as unknown as Promise<T>);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      });
    })
  }
  
}