import Vue from 'vue'
import App from './App.vue'
import Alert from './coms/alert/main'
Vue.prototype.$alert = Alert;
import en from './lib/lang/en'
import zhCN from './lib/lang/zh-CN'
import zhTW from './lib/lang/zh-TW'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const messages = {
  en: en,
  zhCN: zhCN,
  zhTW: zhTW
}
const i18n = new VueI18n({
  locale: 'zhTW', // 语言标识
  messages
})
new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
