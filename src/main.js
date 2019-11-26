import Vue from 'vue';
import App from './App.vue';
import LangMain from '@lib/lang/main';
import Alert from '@lib/alert/main';
import axios from 'axios';
const locale = new LangMain();
Vue.prototype.$alert = Alert;
Vue.prototype.$t = locale.ils8;
Vue.prototype.$ils8 = locale.use;
Vue.prototype.$axios = axios;
locale.use('123');
new Vue({
    render: h => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map