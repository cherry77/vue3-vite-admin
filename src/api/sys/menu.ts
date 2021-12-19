import { defHttp } from '@/utils/request';

enum Api {
  GetMenuList = '/getMenuList',
}

export const getMenuList = () => {
  return defHttp.fetch({
    method: 'GET',
    url: Api.GetMenuList
  })
};
