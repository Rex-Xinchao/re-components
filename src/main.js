import Vue from "vue";
import App from "./App.vue";

require("./coms/install");

new Vue({
  el: "#app",
  render: h => h(App)
});
