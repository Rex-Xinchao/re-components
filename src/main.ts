import Vue from 'vue'
import App from './App.vue'
import LangMain from '@lib/lang/main'
import Alert from '@lib/alert/main'
import axios, { AxiosInstance } from 'axios'

const locale = new LangMain();
Vue.prototype.$alert = Alert;
Vue.prototype.$t = locale.ils8;
Vue.prototype.$ils8 = locale.use;
locale.use('123');

Vue.use(v => {
    v.prototype.$axios = axios
});

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance
    }
}

new Vue({
    render: h => h(App),
}).$mount('#app');
