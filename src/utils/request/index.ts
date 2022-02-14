import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import HttpRequest from './Axios'
import { merge } from 'lodash-es'
import { ContentTypeEnum } from './httpEnum'

function createAxios(options?: Partial<AxiosRequestConfig>){
  return new HttpRequest(
    merge(
      {
        // 基础接口地址
        baseURL: import.meta.env.VITE_API_BASEURL,
        // 超时时间
        timeout: 10 * 1000,
        // 默认数据传递格式
        headers: { 'Content-Type': ContentTypeEnum.JSON },

        // 数据处理方式
        // transform
        requestOptions: {
          // 取消重复请求
          cancelRepeatRequest: false,
          // 加上时间戳
          withTimestamp: true
        }
      },
      options || {},
    )
  )
}
export const defHttp = createAxios();