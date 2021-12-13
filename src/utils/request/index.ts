import type { AxiosResponse } from 'axios';
import { HttpRequest } from './Axios'
import { deepMerge } from '@/utils'
import qs from 'qs' // 这里还要引入type/qs
import { ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

// const transform: any = {
//   // transformRequest 允许在向服务器发送前，修改请求数据，只能用在 'PUT'，'POST' 和 'PATCH'，且后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
//   /**
//    * 处理请求数据。如果数据不是预期格式，可直接抛出错误
//    */
//    transformRequestHook: (res: AxiosResponse<Result>, options: any) => {
//       // 错误的时候返回
//       const { data } = res;
//       if (!data) {
//         // return '[HTTP] Request has no return value';
//         // throw new Error(t('sys.api.apiRequestFailed'));
//         throw new Error('The interface request failed, please try again later!');
//       }
//       //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
//       const { code, result, message } = data;

//       // 这里逻辑可以根据项目进行修改
//       const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
//       if (hasSuccess) {
//         return result;
//       }
//    },
//   // requestInterceptors: (config, options) => {
//   //   console.log(config)
//   // }
// }

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

        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 忽略重复请求
          ignoreCancelToken: true,
        }
      },
    )
  )
}

export const defHttp = createAxios({
  baseURL: 'basic-api'
})
