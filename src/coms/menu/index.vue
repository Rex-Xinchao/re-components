<template>
    <div class="re-menu-container">
        <ul class="re-menu" :style="{backgroundColor: backgroundColor}">
            <li v-for="(item, index) in options" class="re-menu-item"
                :class="{'re-menu-item--active': selectedTag === item.value, 're-menu-item--disabled': item.disabled}"
                :style="{  color: selectedTag === item.value ? activeTextColor : textColor,  borderBottomColor: selectedTag === item.value ? activeTextColor : textColor}"
                :disabled="item.disabled" :value="item.value" :key="index"
                @click="onSelect(item)">
                <slot :label="item.label" :value="item.value"></slot>
            </li>
        </ul>
        <div class=" re-right-tools">
            <slot name="rightTools"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 're-menu',
  props: {
    options: { type: Array, required: true },
    default: { type: [String, Number], default: '' },
    backgroundColor: { type: String, default: '#fff' },
    textColor: { type: String, default: '#a0a0a0' },
    activeTextColor: { type: String, default: '#409eff' }
  },
  data () {
    return {
      selectedTag: this.default
    }
  },
  methods: {
    onSelect (item) {
      item.disabled || (this.selectedTag = item.value)
      item.disabled || this.$emit('select', item.value)
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/menu";
</style>
