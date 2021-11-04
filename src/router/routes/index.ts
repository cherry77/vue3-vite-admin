import type { RouteRecordRaw } from 'vue-router';

import { PageEnum } from '@/enums/pageEnum';

const modules = import.meta.globEager('./modules/**/*.ts');


export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    // title: t('routes.basic.login'),
  },
};