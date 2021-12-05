import { HttpRequest } from './Axios'
import { deepMerge } from '@/utils'
import qs from 'qs'

enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

const transform: any = {
  // transformRequest 允许在向服务器发送前，修改请求数据，只能用在 'PUT'，'POST' 和 'PATCH'，且后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  // transformRequest: [
  //   (data: any) => {
  //     return qs.stringify(data)
  //   }
  // ],
  requestInterceptors: (config, options) => {
    console.log(config)
  }
}

function createAxios(opt?: any) {
	return new HttpRequest(
    deepMerge(
      opt || {},
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: '',
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },

        // 数据处理
        transform,
      }
    )
  )
}

export const defHttp = createAxios()
