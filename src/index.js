import LangMain from './libs/lang/main'
import AlertMain from './libs/alert/main'
import Switch from './components/switch.vue'
import CircleProgress from './components/circle_progress.vue'
import LineProgress from './components/line_progress.vue'
import './styles/coms/alert.scss'

const components = [
  Switch,
  CircleProgress,
  LineProgress
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
  Switch,
  CircleProgress,
  LineProgress
}
