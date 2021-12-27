import '@/design/index.less';
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter, router } from '@/router';
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@/store';
import { setupI18n } from '@/locale/setupI18n'


// if (import.meta.env.DEV) {
import('ant-design-vue/dist/antd.less');
// }
import '@purge-icons/generated'
import 'windi.css'

async function bootstrap() {
  const app = createApp(App)
  // Configure store
  setupStore(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
