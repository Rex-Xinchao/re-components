<template>
  <div class="re-upload-container">
    <div class="re-upload">
      <ul class="re-uploaded-pic-list">
        <li
          v-for="(file, index) in fileList"
          :key="index"
          @mouseover="onToolOver(index)"
          @mouseleave="onToolLeave(index)"
        >
          <div class="re-pic-show" :style="{ backgroundImage: `url('${file.url}')` }"></div>
          <div v-show="toolShow && index === toolIndex" class="re-uploaded-tools">
            <div class="tools-icon">
              <div @click="enlargeFile(file)" class="icon-enlarge"></div>
              <div @click="deleteFile(index, file)" class="icon-trash"></div>
            </div>
          </div>
        </li>
      </ul>
      <div class="re-upload-box" ref="upload_box">
        <i class="re-upload-icon"></i>
        <div class="re-upload-text">{{ $ils8.transf('upload.tip') }}</div>
        <input type="file" ref="input" class="re-upload-input" multiple @change="onFileUpload" />
      </div>
    </div>
    <div class="re-upload-tips" v-html="tips"></div>
    <div class="re-model" v-show="model.show">
      <button class="re-close-btn">
        <div class="icon-close" @click="model.show = false"></div>
      </button>
      <div class="re-model-body">
        <img class="image-show" :alt="model.name" :src="model.url" />
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from '../../mixins/uploadFile'

export default {
  name: 're-upload',
  props: {
    tips: { type: String, default: '只能上传jpg/png文件，且不超过500kb' },
    fileType: {
      type: Array,
      default: (e) => {
        return ['image/jpeg', 'image/png', 'image/jpg']
      }
    },
    fileSize: { type: Number, default: 2 },
    fileAmount: { type: Number, default: 9 },
    url: { type: String, required: true }
  },
  mixins: [UploadFile],
  data() {
    return {
      model: {
        show: false,
        url: ''
      },
      fileList: [],
      fileListShow: [],
      toolShow: false,
      toolIndex: 0
    }
  },
  methods: {
    onToolOver(index) {
      this.toolShow = true
      this.toolIndex = index
    },
    onToolLeave(index) {
      this.toolShow = false
      this.toolIndex = index
    },
    deleteFile(index, file) {
      this.fileList.splice(index, 1)
      this.$emit('change', file, this.fileList)
    },
    enlargeFile(file) {
      this.model.show = true
      this.model.name = file.name
      this.model.url = file.url
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/index';
@import '../../styles/coms/upload';
</style>
