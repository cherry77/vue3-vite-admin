import { LoginRoute } from '@/router/routes'
import type { AppRouteRecordRaw } from '@/router/types';
import { defineStore } from 'pinia'

import { getMenuList } from '@/api/sys/menu';

interface UserState {
  userInfo: any;
  token?: string;
  roleList: any[];
  // sessionTimeout?: boolean;
  // lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: []
  }),
  getters: {
    getUserInfo(): any {
      return this.userInfo
    },
    getToken(): any {
      return this.token
    }
  },
  actions: {
    setToken(info: string | undefined){
      this.token = info ? info : ''
    },
    // async login(params) {
    //   try {
    //     const { goHome = true, mode, ...loginParams } = params;
    //     const data = await loginApi(loginParams, mode);
    //     const { token } = data;

    //     // save token
    //     this.setToken(token);
    //     return this.afterLoginAction(goHome);
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    // async LoginRoute(params: any){
    //   let routeList: AppRouteRecordRaw[] = [];
    //   try {
    //     routeList = (await getMenuList()) as AppRouteRecordRaw[];
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }
})
