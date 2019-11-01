<template>
    <div class="re-rate-container">
        <div class="re-rate-box">
            <span class="re-rate-icon" v-for="index in 5"
                  @click="onSelected(index)" @mouseover="moused = index" @mouseleave="moused = 0"
                  :class="{active: index <= selected || index <= moused}"></span>
        </div>
        <div class="re-rate-text">{{`${tips}:${moused || selected || 0}`}}</div>
    </div>
</template>

<script>
// 2张图片路径的引用会出问题，待解决
export default {
  name: 're-rate',
  props: {
    tips: { default: '评分', type: String }
  },
  data () {
    return {
      moused: 0,
      selected: 0
    }
  },
  methods: {
    onSelected (index) {
      this.selected = index
      this.$emit('onSelected', index)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../../styles/index";

    .re-rate-container {
        width: auto;
        height: 20px;
        line-height: 20px;
        padding: 1px;

        .re-rate-icon {
            display: inline-block;
            width: 18px;
            height: 16px;
            background-image: url("../../assets/star.png");
            background-repeat: no-repeat;
        }

        .re-rate-box{
            display: block;
            width: auto;
            height: 16px;
            float: left;
        }

        .re-rate-text {
            display: block;
            width: auto;
            height: 16px;
            font-size: 12px;
            color: rgb(255, 153, 0);
            line-height: 16px;
            text-indent: 1em;
        }

        .active {
            background-image: url("../../assets/start_full.png");
        }
    }
</style>
