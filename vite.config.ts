import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const root = process.cwd();
  const env = loadEnv(mode, root);
  
  return {
    plugins: [vue()], // 编译vue文件
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // @/xxxx => src/xxxx
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: ,
          additionalData:  `@import (reference) "${resolve('src/design/config.less')}";`,
          javascriptEnabled: true,
        },
      },
    },
  }
})

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}