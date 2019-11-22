import LangMain from './libs/lang/main'
import AlertMain from './libs/alert/main'
import Switch from './components/switch.vue'
import './styles/coms/alert.scss'

//todo 待实现组件select、table、开关、滑块、进度条、下拉菜单、日历
const components = [
  Switch
]

const install = function (Vue, ops = {}) {
  components.forEach(com => {
    Vue.component(com.name, com)
  })
  const locale = new LangMain()
  Vue.prototype.$alert = AlertMain;
  Vue.prototype.$t = locale.ils8
  Vue.prototype.$ils8 = locale.use
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Switch
}
