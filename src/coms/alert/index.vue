<template>
    <transition name="slide-fade">
        <div class="re-alert" v-if="show" :style="{background: this.bgColor, borderColor: this.bgColor}">
            <p class="re-alert--text" :style="{color: this.textColor}">{{message}}</p>
        </div>
    </transition>
</template>

<script>
import { textColorObj, bgColorObj } from './cfg'

export default {
  name: 're-alert',
  data () {
    return {
      show: '',
      type: '',
      time: 3,
      message: '',
      style: {
        textColor: '',
        bgColor: ''
      }
    }
  },
  methods: {
    alertMsg () {
      this.show = true
      this.setColor()
      this.hideAlertMsg()
    },
    setColor () {
      this.textColor = textColorObj[this.type]
      this.bgColor = bgColorObj[this.type]
    },
    hideAlertMsg () {
      setTimeout(e => {
        this.show = false
      }, this.time * 1000)
    }
  },
  mounted () {
    this.alertMsg();
  }
}
</script>

<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/alert";
</style>
