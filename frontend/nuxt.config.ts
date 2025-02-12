// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/public/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        protocol: "ws",
        host: "0.0.0.0",
        port: 24678,
      },
    },
  },

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
})
