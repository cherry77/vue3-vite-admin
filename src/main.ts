import { createApp } from 'vue'
import App from './App.vue'
// import { router, setupRouter } from '@/router';

function bootstrap(){
  const app = createApp(App)

  app.mount('#app')
}

bootstrap()
