import { defHttp } from '@/utils/request';

enum Api {
  DEMO_LIST = '/table/getDemoList',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: any) =>
  defHttp.fetch({
    method: 'GET',
    url: Api.DEMO_LIST,
    params
  })
