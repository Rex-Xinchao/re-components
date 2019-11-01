<template>
    <div class="re-drop-menu" ref="dropDown">
        <div class="re-drop-link" @click="showDropDown">
            <slot v-if="hasSlots" name="drop-link"></slot>
            <span v-else>{{text}}</span>
        </div>
        <div class="re-drop-down-list" v-if="isShow">
            <slot name="drop-down"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 're-drop-menu',
  data () {
    return {
      isShow: false
    }
  },
  props: {
    text: {
      type: String, default: ''
    },
    width: {
      type: Number, default: 80
    }
  },
  computed: {
    hasSlots () {
      let isExist = false
      for (let key in this.$slots) {
        if (key === 'drop-link') {
          isExist = true
        }
      }
      return isExist
    }
  },
  methods: {
    setWidth () {
      this.$refs.dropDown.style.width = this.width + 'px'
    },
    showDropDown () {
      this.isShow = !this.isShow
    }
  },
  mounted () {
    this.setWidth()
    // 点击区域外收回弹窗
    let $body = document.getElementsByTagName('html')[0]
    $body.onclick = e => {
      let isExist = false
      e.path.forEach(item => {
        if (item.className && item.className.includes('re-drop-menu')) {
          isExist = true
        }
      })
      isExist || (this.isShow = false)
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/dropMenu";
</style>
