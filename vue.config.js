const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify' // เพิ่ม Vuetify ใน transpileDependencies
  ],

  // ปรับ public path ให้เหมาะสมกับ IIS
  publicPath: process.env.NODE_ENV === 'production' ? '/WebEngagementSurvey/' : '/',

  // กำหนด output directory ให้ตรงกับโฟลเดอร์ใน IIS
  outputDir: 'dist',

  // การปรับแต่งเพิ่มเติม เช่น กำหนดไฟล์ index.html
  indexPath: 'index.html',

  // สำหรับการจัดการไฟล์ assets
  assetsDir: 'assets',

  // หากใช้ history mode ใน vue-router ต้องมีการจัดการ fallback
  devServer: {
    historyApiFallback: true,
  },

  // กำหนดให้ build ผลลัพธ์นั้นเป็นแบบ production-friendly
  productionSourceMap: false,

  // เพิ่มการตั้งค่าสำหรับ Cross-Origin Resource Sharing (CORS) ใน dev server หากจำเป็น
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
});
