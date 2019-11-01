<template>
    <div ref="switch" class="re-switch" :class="_isActive" @click="switchToggle">
        <i class="re-switch-circle"></i>
    </div>
</template>

<script>
export default {
  name: "re-switch",
  data () {
    return {
      isSwitch: false
    }
  },
  props: {
    _isDisabled: {
      type: Boolean,
      default: e => {
        return false
      }
    },
    activeColor: {
      type: String,
      default: 'rgb(19, 206, 102)'
    },
    inactiveColor: {
      type: String,
      default: 'rgb(255, 73, 73)'
    },
    width: {
      type: Number,
      default: 40
    }
  },
  computed: {
    _isActive () {
      if (this._isDisabled) {
        return 're-switch-disabled'
      } else {
        return this.isSwitch ? 're-switch-active' : ''
      }
    }
  },
  methods: {
    switchToggle () {
      !this._isDisabled && (this.isSwitch = !this.isSwitch)
      !this._isDisabled && (this.$emit('change', this.isSwitch))
      this.setBackgroundColor();
    },
    setBackgroundColor() {
      let newColor = this.isSwitch ? this.activeColor : this.inactiveColor;
      this.$refs.switch.style.borderColor = newColor;
      this.$refs.switch.style.backgroundColor = newColor;
    },
    setWidth() {
      this.$refs.switch.style.width = this.width + 'px';
    },
  },
  mounted() {
    this.setBackgroundColor();
    this.setWidth();
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/switch";
</style>
