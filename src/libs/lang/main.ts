import Vue from 'vue'
import langSum from './index'

let languageOpts: any = langSum['zhCN'];
const locale: any = function () {
};

const alertMsg = (msg: String):void => {
    if (Vue.prototype.$alert) {
        Vue.prototype.$alert(msg, 'error');
        return
    }
    console.error(msg)
}

locale.prototype = {
    use: (lang: 'en' | 'zhCN' | 'zhTW') => {
        if (!lang) {
            alertMsg('语言不能为空');
            languageOpts = langSum['zhCN'];
            return
        }
        if (!langSum[lang]) {
            alertMsg('该语言暂不支持');
            languageOpts = langSum['zhCN'];
            return
        }
        languageOpts = langSum[lang]
    },
    ils8: (keyString: String) => {
        let keyList = keyString.split('.');
        let opts = languageOpts;
        let text = '';
        keyList.forEach(k => {
            for (let key in opts) {
                if (k === key) {
                    if (typeof opts[key] === 'object') {
                        opts = opts[key]
                    } else {
                        text = opts[key]
                    }
                }
            }
        });
        return text
    }
};

export default locale
