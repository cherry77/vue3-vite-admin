import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateAxiosOptions, RequestOptions, Result } from './types';
import { RequestEnum, ContentTypeEnum } from './httpEnum'
import qs from 'qs'
import { checkStatus } from './checkStatus'


function joinTimestamp(withTimestamp: boolean){
  return withTimestamp ? { _t: new Date().getTime() } : {}
}

export default {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config: AxiosRequestConfig, requestOptions: RequestOptions, options: CreateAxiosOptions) => {
    const { method, data, params } = config
    const { withTimestamp = true } = requestOptions

    if(method?.toUpperCase() === RequestEnum.GET){
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      config.params = Object.assign({}, params, joinTimestamp(withTimestamp))
    }else{
      if (Reflect.has(config, 'data') && data) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }
    }
    // support form-data
    const headers = config.headers || options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (contentType == ContentTypeEnum.FORM_URLENCODED && config.data && method?.toUpperCase() !== RequestEnum.GET) {
      config.data = qs.stringify(data, { arrayFormat: 'brackets' })
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: AxiosRequestConfig, options: CreateAxiosOptions) => {
    const token = '123456'
    if(token){
      // @ts-ignore
      config.headers.Authorization = token
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
   responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { message } = error || {};
    const status: number = error?.response?.status
    checkStatus(status, message)  // 处理错误状态码

    return Promise.reject(error); // 错误继续返回给到具体页面
  },

  // 处理响应数据
  transformResponseHook: (res: AxiosResponse<Result>) => {

  }
}