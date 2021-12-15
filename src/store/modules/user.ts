import { LoginRoute } from '@/router/routes'
// import type { AppRouteRecordRaw } from '@/router/types';
import { defineStore } from 'pinia'
import { TOKEN_KEY, USER_INFO_KEY, MENUS_KEY } from '@/enums/cacheEnum';
import { getItem, setItem } from '@/utils/storage'

import { getMenuList } from '@/api/sys/menu';
import { loginApi } from '@/api/sys/user';

interface UserState {
  userInfo: any;
  token?: string;
  roleList: any[];
  menuList: any[];
  // sessionTimeout?: boolean;
  // lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    menuList: []
  }),
  getters: {
    getUserInfo(): any {
      return this.userInfo || getItem(USER_INFO_KEY)
    },
    getToken(): any {
      return this.token || getItem(TOKEN_KEY)
    },
    getMenus(): any {
      return this.menuList || getItem(MENUS_KEY)
    }
  },
  actions: {
    setToken(info: string){
      this.token = info ? info : ''
      setItem(TOKEN_KEY, info);
    },
    async login(params: any){
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const res = await loginApi(loginParams);
        const { token } = res.data.result;
        // save token
        this.setToken(token);
        this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome? : boolean){
      try {
        const res = await getMenuList();
        setItem(MENUS_KEY, res.data.result);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
})
