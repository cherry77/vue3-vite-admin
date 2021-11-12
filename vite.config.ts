import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// import { viteThemePlugin, antdDarkThemePlugin } from 'vite-plugin-theme';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const root = process.cwd();
  const env = loadEnv(mode, root);
  
  return {
    plugins: [
      vue(), // 编译vue文件
      vueJsx(),
      // viteThemePlugin({
      //   // Match the color to be modified
      //   colorVariables: [],
      // }),
      // antdDarkThemePlugin({
      //   preloadFiles: [
      //     resolve(root, 'node_modules/ant-design-vue/dist/antd.less'),
      //     //path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.dark.less'),
      //     resolve(root, 'src/design/index.less'),
      //   ],
      //   darkModifyVars: {
      //     hack: `@import (reference) "${resolve('src/design/config.less')}";`,
      //     'border-color-base': '#303030',
      //   }
      // })
    ], 
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
    server: {
      // Listening on all local IPs
      host: true,
      port: 3200,
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