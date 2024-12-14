// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  typescript: {
    strict: true,
  },
  plugins: ['~/plugins/google-maps.client.ts'],
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      flaskApiUrl: process.env.FLASK_API_URL,
      webSocketApiUrl: process.env.WEBSOCKET_API_URL,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      charset: "utf-8",
      viewport: "width=device-width",
      title: "QR行動",
      meta: [
        {
          name: "description",
          content:
            "敵のQRコードを撮影し生き残れ！単位をかけたバトルロイヤルだ！",
        },
      ],
    },
  },
  css: [
    "./assets/style/reset.css",
  ],
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],
});