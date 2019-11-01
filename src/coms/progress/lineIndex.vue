<template>
    <div class="re-progress" ref="progress">
        <div class="re-progress-bar">
            <div class="re-progress-bar_inner">
                <div class="re-progress-text_inner" v-show="isInner">{{`${progress}%`}}</div>
            </div>
        </div>
        <div class="re-progress-text" v-show="!isInner">{{`${progress}%`}}</div>
    </div>
</template>

<script>
export default {
  name: 're-progress',
  data () {
    return {
      strokeWidth: 0
    }
  },
  props: {
    width: {
      type: Number, default: 250
    },
    height: {
      type: Number, default: 6
    },
    isInner: {
      type: Boolean, default: e=> {
        return true
      }
    },
    color: {
      type: String, default: '#409eff'
    },
    progress: {
      type: Number, default: 50,
      validator: val => val >= 0 && val <= 100
    }
  },
  watch: {
    progress () {
      this.$refs.progress.firstChild.firstChild.style.width = this.progress + '%'
    }
  },
  mounted () {
    let $progress = this.$refs.progress
    let $progressBar = $progress.firstChild
    let $progressBarInner = $progressBar.firstChild
    let $innerText = $progressBarInner.firstChild
    this.strokeWidth = this.isInner && this.height < 16 ? 16 : this.height
    $progress.style.width = this.width + 'px'
    $progressBar.style.height = this.strokeWidth + 'px'
    $progressBarInner.style.width = this.progress + '%'
    $progressBarInner.style.backgroundColor = this.color
    $innerText.style.lineHeight = this.strokeWidth + 'px'
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/progress";
</style>
