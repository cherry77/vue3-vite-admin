// import { defHttp } from '@/utils/http/axios';
import defHttp from '@/utils/http/axios';
import axios from 'axios'

enum Api {
  // GetMenuList = '/getMenuList',
  GetMenuList = 'basic-api2/getMenuList',
}

/**
 * @description: Get user menu based on id
 */
const instance = axios.create()
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // throw new Error("222");
  
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
instance.interceptors.response.use(undefined, function(error){
  console.log(error)
});

export const getMenuList = () => {
  return instance.get(Api.GetMenuList)
  // return defHttp({ url: Api.GetMenuList, method: 'get' });
};
