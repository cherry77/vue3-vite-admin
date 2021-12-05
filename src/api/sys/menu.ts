// import { defHttp } from '@/utils/http/axios';
import fetchAxios from '@/utils/http/axios';

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return fetchAxios({ url: Api.GetMenuList, method: 'get' });
};
