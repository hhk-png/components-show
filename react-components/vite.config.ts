import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import postCssPxToRem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    base: '/components-show',
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 16 * 0.90,
            propList: ['*'],
            unitPrecision: 2,
            exclude: /node_modules/gi,
          }),
        ],
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: '/src/main.tsx',
          index: '/index.html',
          ...(isProduction ? {} : {
            showMain: '/src/main-show.tsx',
            showHtml: '/index-show.html',
          }),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const segments = id.split('node_modules/.pnpm/')
              if (segments.length > 1) {
                const strs = segments[1].split('/')
                // packageName
                const packageName = strs[0]
                let position = 0
                if (packageName.startsWith('@')) {
                  position = 1
                }
                const name = packageName.slice(0, packageName.indexOf('@', position))

                // if different sub packages hava same return name,
                //  they will be bundled to one file
                return `vendor-${name}`
              }
            }

            if (id.includes('/src/components/')) {
              // 将位于 /src/components/ 下的文件分离为单独的 chunk
              const componentName = id.split('/src/components/')[1].split('/')[0];
              return `components-${componentName}`;
            }
          },
        },
      }
    },
    resolve: {
      alias: {
        '~': resolve('./src'),
      },
    },
    plugins: [react(), tailwindcss()],
  }
})
