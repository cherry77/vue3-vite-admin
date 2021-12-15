import { defHttp } from '@/utils/request'

enum Api {
  Login = '/login',
}

export function loginApi(params:any) {
  return defHttp.post({
      url: Api.Login,
      params,
  });
}