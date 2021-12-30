import type { Router } from 'vue-router'
import { useUserStoreWithOut, useUserStore } from '@/store/modules/user'

export const setupRouterGuard = (router: Router) => {
  createPageGuard(router)
}

const createPageGuard = (router: Router) => {
  // const useStore = useUserStoreWithOut()
  const useStore = useUserStore()
  const token = useStore.getToken

  router.beforeEach(async (to, from, next) => {
    if(!token){
      if(to.name !== 'Login'){
        next({ name: 'Login' })
      }
    }else{
      if(to.name == 'Login'){
        next('/')
      }
    }
    next()
  })
}