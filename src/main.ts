import '@/design/index.less';
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router';

// if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
// }
function bootstrap(){
  const app = createApp(App)

  // Configure routing
  setupRouter(app);

  app.mount('#app')
}

bootstrap()
