<template>
    <div class="re-screenshot-container">
        <slot v-if="hasSlots" name="custom"></slot>
        <button v-else class="re-screenshot" @click="saveAsImage">{{msg}}</button>
    </div>
</template>

<script>
import html2canvas from '../../lib/html2canvas.main'

export default {
  name: 're-screenshot',
  props: {
    msg: { default: '截图', type: String },
    fileName: { default: '截图', type: String },
    scaleBy: { default: 5, type: Number },
    targetId: { required: true, type: String }
  },
  data () {
    return {
      options: {
        allowTaint: true,//允许加载跨域的图片
        tainttest: true, //检测每张图片都已经加载完成
        logging: false, //日志开关，发布的时候记得改成false
        scale: '', // 添加的scale 参数
        canvas: '', //自定义 canvas
        width: '', //dom 原始宽度
        height: '' //dom 原始高度
      }
    }
  },
  computed: {
    hasSlots () {
      let isExist = false
      for (let key in this.$slots) {
        if (key === 'custom') {
          isExist = true
        }
      }
      return isExist
    }
  },
  methods: {
    saveAsImage () {
      let imageUrl = ''
      let dom = document.getElementById(this.targetId) //获取目标对象
      let canvas = document.createElement('canvas');  //创建canvas 对象
      let width = dom.offsetWidth;  // 获取(原生）dom 宽度
      let height = dom.offsetHeight; // 获取(原生）dom 高
      let offsetTop = dom.offsetTop;  //元素距离顶部的偏移量
      let offsetLeft = dom.offsetLeft;  //元素距离顶部的偏移量
      let scale = this.scaleBy;
      let context = canvas.getContext('2d');
      canvas.width = (width + offsetLeft) * scale;   // 注意宽度问题， 是否存在左右间距
      canvas.height = (height + offsetTop) * scale;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
      context.scale(scale, scale);
      let opts = Object.assign(this.options, { scale, width, height })
      html2canvas(dom, opts).then(canvas => {
        imageUrl = canvas.toDataURL('image/png');
        this.downLoad(imageUrl)
        this.$emit('onImageChange', imageUrl)
      });
    },
    downLoad (imageUrl) {
      if (!imageUrl) {
        this.$alert(this.$t('screenshots.alert'), 'error')
      } else {
        let a = document.createElement('a');
        a.innerHTML = ' ';
        a.id = 'download-btn-pic';
        a.download = this.fileName; //不能为空，ie浏览器会不能兼容
        a.href = imageUrl;
        this.clickEvent(a);
      }
    },
    clickEvent (a) {
      if (document.all) {
        a.click();
        a.remove()
      } else {
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        a.dispatchEvent(evt);
        a.remove();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/screenshot";
</style>
