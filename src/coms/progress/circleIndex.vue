<template>
    <div class="re-progress-circle" ref="progressCircle">
        <canvas id="progressCircle"></canvas>
        <span class="re-progress-text" ref="text">{{`${progress}%`}}</span>
    </div>
</template>

<script>
export default {
  name: "re-progress-circle",
  data () {
    return {}
  },
  props: {
    radius: {
      type: Number, default: 50
    },
    strokeWidth: {
      type: Number, default: 8
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
      this.createCircle()
      this.setText()
    }
  },
  methods: {
    createCircle () {
      let canvas = document.getElementById('progressCircle')
      let ctx = canvas.getContext('2d')
      canvas.width = this.radius * 2
      canvas.height = this.radius * 2
      let x = this.radius
      let y = this.radius
      let size = this.radius - this.strokeWidth
      let start = Math.PI
      let end = Math.PI + 2 * this.progress / 100 * Math.PI
      ctx.beginPath()
      ctx.arc(x, y, size, start, end);
      ctx.strokeStyle = '#00ff99';
      ctx.lineWidth = this.strokeWidth;
      ctx.stroke()
    },
    setText () {
      let carWidth = 11 // %的宽度
      let width = String(this.progress).length * 7
      let skewLength = (carWidth + width) / 2
      this.$refs.text.style.top = this.radius - 8 + 'px'
      this.$refs.text.style.left = this.radius - skewLength + 'px'
    }
  },
  mounted () {
    this.createCircle()
    this.setText()
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/progress";
</style>
