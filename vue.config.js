const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'CPOC AIMS',
    themeColor: '#2859A8',
    msTileColor: '#2859A8',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // }
  },
  devServer: {
    port: 8081 // Specify the port you want to use
  },
  chainWebpack: config => { config.plugin('html').tap(args => { args[0].title = 'CPOC AIMS'; return args; }); }
})