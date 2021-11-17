import '@/design/index.less';
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router';
import {setupI18n} from '@/locale/setupI18n'

// if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
// }
import '@purge-icons/generated'
import 'windi.css'

async function bootstrap(){
  const app = createApp(App)

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  app.mount('#app')
}

bootstrap()
