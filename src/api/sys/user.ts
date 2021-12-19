import { defHttp } from '@/utils/request'

enum Api {
  Login = '/login',
}

export function loginApi(data:any) {
  return defHttp.fetch({
      url: Api.Login,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
  });
}