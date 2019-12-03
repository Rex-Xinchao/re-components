import LangMain from './libs/lang/main'
import AlertMain from './libs/alert/main'
import CircleProgress from './components/circle_progress.vue'
import Compress from './components/compress.vue'
import Drag from './components/drag.vue'
import DropDown from './components/dropDown.vue'
import LineProgress from './components/line_progress.vue'
import MenuTag from './components/menuTag.vue'
import ScreenShot from './components/screenshot.vue'
import Switch from './components/switch.vue'
import Upload from './components/upload.vue'
import './styles/coms/alert.scss'
import axios from "axios";

const components = [
  CircleProgress,
  Compress,
  Drag,
  DropDown,
  LineProgress,
  MenuTag,
  ScreenShot,
  Switch,
  Upload
]

const install = function (Vue, ops = {}) {
  components.forEach(com => {
    Vue.component(com.name, com)
  })
  const locale = new LangMain()
  Vue.prototype.$axios = axios
  Vue.prototype.$alert = AlertMain;
  Vue.prototype.$t = locale.ils8
  Vue.prototype.$ils8 = locale.use
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  CircleProgress,
  Compress,
  Drag,
  DropDown,
  LineProgress,
  MenuTag,
  ScreenShot,
  Switch,
  Upload
}
