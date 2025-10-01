export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      title: 'Портфолио — Фронтенд',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Портфолио фронтенд-разработчика: проекты, стек, контакты.' },
        { name: 'theme-color', content: '#0b1020', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
