import langSum from './index'

let languageOpts = langSum['zhCN']
const locale = function () {
}
locale.prototype = {
  use: function (lang) {
    if (!lang) {
      this.$alert('语言不能为空', 'error')
      return
    }
    if (!langSum[lang]) {
      this.$alert('该语言暂不支持', 'error')
    } else {
      languageOpts = langSum[lang]
    }
  },
  ils8: function (keyString) {
    let keyList = keyString.split('.')
    let opts = languageOpts
    let text = ''
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
    })
    return text
  }
}

export default locale
