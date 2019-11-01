<template>
    <div class="re-compress-container">
        <div class="re-upload">
            <div class="re-upload-box" ref='upload_box'>
                <i class="re-upload-icon"></i>
                <div class="re-upload-text">{{$t("compress.tip")}}</div>
                <input type="file" ref="input" class="re-upload-input" multiple @change="onFileUpload">
            </div>
        </div>
        <div class="re-compress-show" v-show="show">
            <p class="re-compress__text">{{`${$t("compress.selectText")}：${file.name}，${$t("compress.sizeText")}：${file.size}M`}}</p>
            <p class="re-compress__text">{{`${$t("compress.oldPicSizeText")}：${file.width}x${file.height}`}}</p>
            <p class="re-compress__text">{{`${$t("compress.newPicSizeText")}：${newFile.width}x${newFile.height}`}}</p>
            <p class="re-compress__text">{{$t("compress.success")}}，<a :href="newFile.imageUrl" :download="file.name">{{$t("compress.download")}}</a></p>
        </div>
    </div>
</template>

<script>
import UploadFile from '../../mixins/uploadFile'

export default {
  name: 're-compress',
  props: {
    size: {
      type: Object, default: () => {
        return {
          maxWidth: 400,
          maxHeight: 400
        }
      }
    }
  },
  mixins: [UploadFile],
  data () {
    return {
      file: {
        name: '',
        size: '',
        width: '',
        height: ''
      },
      newFile: {
        width: '',
        height: '',
        imageUrl: ''
      },
      fileType: ['image/jpeg', 'image/png', 'image/jpg'],
      fileSize: 5,
      show: false
    }
  },
  methods: {
    analysisFile (file) { // 解析文件
      let reader = new FileReader()
      let img = new Image();
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      this.file.name = file.name
      this.file.size = (file.size / 1024 / 1024).toFixed(3)
      reader.readAsDataURL(file)
      reader.onload = e => {
        img.src = e.target.result
      }
      img.onload = e => {
        // 图片原始尺寸
        let { width, height } = e.path[0]
        Object.assign(this.file, { width, height })
        // 最大尺寸限制
        let { maxWidth, maxHeight } = this.size
        // 目标尺寸
        let { targetWidth, targetHeight } = { targetWidth: width, targetHeight: height }
        // 图片尺寸超过400x400的限制
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (height / width));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (width / height));
          }
        }
        // canvas对图片进行缩放
        this.newFile.width = canvas.width = targetWidth;
        this.newFile.height = canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        this.newFile.imageUrl = canvas.toDataURL('image/png')
        this.show = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../../styles/index";
    @import "../../styles/coms/upload";
    @import "../../styles/coms/compress";
</style>
