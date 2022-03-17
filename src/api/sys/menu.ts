import { defHttp } from '@/utils/request';

enum Api {
  GetMenuList = '/getMenuList',
  GetTableData = '/getTableData',
}

export const getMenuList = () => {
  return defHttp.fetch({
    method: 'GET',
    url: Api.GetMenuList
  })
};

export const getTableData = () => {
  return defHttp.fetch({
    method: 'GET',
    url: Api.GetTableData
  })
};
