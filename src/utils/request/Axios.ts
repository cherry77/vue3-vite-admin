import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { cloneDeep } from 'lodash-es'
import { CreateAxiosOptions, RequestOptions, Result } from './types'
import { isFunction } from '@/utils/is'
import axiosTransform from './axiosTransform'
import { AxiosCanceler } from './axiosCanceler'
import { ContentTypeEnum, RequestEnum } from './httpEnum'

export default class HttpRequest {

  private axiosInstance: AxiosInstance
  // 全局配置
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  setupInterceptors () {
    const { requestInterceptors, responseInterceptors, responseInterceptorsCatch } = axiosTransform || {};

    const axiosCanceler = new AxiosCanceler()
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {

      const cancelRepeatRequest = this.options?.requestOptions?.cancelRepeatRequest
      cancelRepeatRequest && axiosCanceler.addPending(config)

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    })

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);

      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 拦截错误处理 error capture
    this.axiosInstance.interceptors.response.use(undefined, (error: any) => {
      error.config && axiosCanceler.removePending(error.config);
      if(responseInterceptorsCatch && isFunction(responseInterceptorsCatch)){
          responseInterceptorsCatch(error)
        }
    })
  }

  /**
   * @param config 使用时传递的参数，url: xxx, params: xxx, method: xxx
   * @param options 接口一些单独的配置参数
   * @returns Promise
   */
  fetch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // let conf: CreateAxiosOptions = cloneDeep(config)
    let conf: CreateAxiosOptions = config
    // 全局选项
    const { requestOptions } = this.options
    // 将接口请求独立选项和全局选项merge在一起
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook } = axiosTransform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt, this.options);
    }
    conf.requestOptions = opt;
    return new Promise((resolve, reject) => {
      this.axiosInstance.request(conf)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
    })
  }
}