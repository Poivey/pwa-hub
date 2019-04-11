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
    name: 'pwa-hub',
    workboxPluginMode: 'InjectManifest',
  },

  lintOnSave: undefined,
}
