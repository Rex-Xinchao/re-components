import langSum from "./index";
import Vue from "vue";

const locale = function(lang = "zhCN") {
  this.languageOpts = langSum[lang];
};

locale.prototype = {
  use: function(lang) {
    if (!lang) {
      Vue.prototype.$alert("语言不能为空", "error");
      return;
    }
    if (!langSum[lang]) {
      Vue.prototype.$alert("该语言暂不支持", "error");
    } else {
      this.languageOpts = langSum[lang];
    }
  },
  transf: function(keyString) {
    let keyList = keyString.split(".");
    let opts = this.languageOpts;
    let text = "";
    keyList.forEach(k => {
      for (let key in opts) {
        if (k === key) {
          if (typeof opts[key] === "object") {
            opts = opts[key];
          } else {
            text = opts[key];
          }
        }
      }
    });
    return text;
  },
  deepClone(source, target) {
    for (let key in source) {
      if (typeof source[key] === "object") {
        this.deepClone(source[key], target[key]);
      } else {
        source[key] = target[key];
      }
    }
  }
};

export default locale;
