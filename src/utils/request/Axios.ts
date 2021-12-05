import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios'
import qs from 'qs'

import { AxiosCanceler } from './AxiosCanceler'

export class HttpRequest{

  private axiosInstance: AxiosInstance

  constructor (options: any) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        headers: { ignoreCancelToken }
      } = config
      
      !ignoreCancelToken && axiosCanceler.addPending(config)
      
    })
  }
  
}