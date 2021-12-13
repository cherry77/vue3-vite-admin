import { defHttp } from '@/utils/request';

enum Api {
  GetMenuList = '/getMenuList',
}

export const getMenuList = () => {
  return defHttp.get({
    url: Api.GetMenuList
  })
};
