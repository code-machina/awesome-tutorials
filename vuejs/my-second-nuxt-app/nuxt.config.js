const pkg = require('./package')
const bodyParser = require('body-parser')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'gbkim1988', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Nanum+Myeongjo|Open+Sans"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css',
    '~/assets/style/app.styl',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** 아래의 미들웨어는 전역적을 적용되는 설정이다.
  */
  router: {
    middleware: [
      // 'log',
      // 'auth',
    ],
  },
  /*
  ** 
  */
  tansition: {
    name: 'fade',
    mode: 'out-in',
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://my-posts-beta.firebaseio.com/',
    fbAPIKey: 'AIzaSyD4qUN92fVamFkASB9k31U05EwJtH1xuAo',
  },
  /*
  ** 
  */
  axios: [
    // proxy Headers : false
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  serverMiddleware: [
    bodyParser.json(),
    '@/api',
  ],
}
