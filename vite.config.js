import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'VueNotification3',
      fileName: (format) => `vue-notification-3.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'velocity-animate'],
      output: {
        globals: {
          vue: 'Vue',
          'velocity-animate': 'Velocity',
        },
      },
    },
  },
});