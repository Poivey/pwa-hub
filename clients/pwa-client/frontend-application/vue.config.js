module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  pwa: {
    name: 'Balloon',
    themeColor: '#c7411b',
    msTileColor: '#0a0a0a',
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://s3.eu-central-1.amazonaws.com/'),
          handler: 'cacheFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: new RegExp('^https://fonts.googleapis.com/css'),
          handler: 'cacheFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },

  lintOnSave: undefined,
}
