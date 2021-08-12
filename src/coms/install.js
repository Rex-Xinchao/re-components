import Vue from "vue";
import langMain from "../lib/lang/main";
import Alert from "./alert/index";
import AlertMain from "./alert/main";
import Compress from "./compress/index";
import Drag from "./drag/index";
import DropMenu from "./dropMenu/index";
import MenuTag from "./menu/index";
import LineProgress from "./progress/lineIndex";
import CircleProgress from "./progress/circleIndex";
import Screenshot from "./screenshot/index";
import Switch from "./switch/index";
import Upload from "./upload/index";
import Input from "./input/index";

const components = [
  Alert,
  Compress,
  Drag,
  DropMenu,
  MenuTag,
  LineProgress,
  CircleProgress,
  Screenshot,
  Switch,
  Upload,
  Input
];
const install = function(Vue, ops = {}) {
  components.forEach(com => {
    Vue.component(com.name, com);
  });
  Vue.prototype.$alert = AlertMain;
  Vue.prototype.$ils8 = new langMain("zhCN");
};

Vue.use(install);
