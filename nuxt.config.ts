// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    }
  },
  app: {
    head: {
      title: 'Days Tracker',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      meta: [
        { name: 'description', content: 'Date difference calculator, with tracking days options.' }
      ],
    }
  }
})
