import axios from 'axios'

const uploadBase = {
  data () {
    return {}
  },
  methods: {
    onFileUpload (e) {
      const fileList = e.target.files
      this.onFileChange(fileList)
    },
    onFileChange (fileList) {
      let isFileType = true
      let isLtSize = true
      Object.values(fileList).forEach(file => {
        this.checkFileType(file.type) || (isFileType = false)
        this.checkFileSize(file.size) || (isLtSize = false)
      })
      if (!isFileType) {
        // 文件格式错误!
        this.$alert('文件格式错误!', 'error')
        return
      }
      if (!isLtSize) {
        // 上传图片大小不能超过 2MB!
        this.$alert('上传图片大小不能超过 2MB!', 'error')
        return
      }
      if (this.fileAmount && [...this.fileList, ...Object.values(fileList)].length > this.fileAmount) {
        // 上传图片数量不能大于9张!
        this.$alert('上传图片数量不能大于9张!', 'error')
        return
      }
      if (isFileType && isLtSize) {
        if (this.url) {
          this.uploadFile(fileList)
        } else {
          this.analysisFile(fileList[0])
        }

      }
    },
    checkFileType (type) {
      return this.fileType.includes(type)
    },
    checkFileSize (size) {
      return size / 1024 / 1024 < this.fileSize
    },
    uploadFile (fileList) {  // 调用上传接口
      Object.values(fileList).forEach(file => {
        let formData = new FormData()
        formData.append('file', file)
        axios.get(this.url, { data: formData }).then(res => {
          file.id = res.id
          if (window.FileReader) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = e => {
              file.url = e.target.result
              this.fileList = [...this.fileList, file]
              this.$emit('change', file, this.fileList)
            }
          } else {
            this.fileList = [...this.fileList, file]
            this.$emit('change', file, this.fileList)
          }
        }).catch(error => {
          this.$alert(error, 'error')
        })
      })
    }
  },
  mounted () {
    // 拖拽事件
    this.$refs.upload_box.onclick = (e) => {
      this.$refs.input.click()
    }
    this.$refs.upload_box.ondragstart = (e) => {
      return false
    }
    this.$refs.upload_box.ondragleave = (e) => {
      e.preventDefault()// 阻止离开时的浏览器默认行为
    }
    this.$refs.upload_box.ondrop = (e) => {
      e.preventDefault()// 阻止拖放后的浏览器默认行为
      const fileList = e.dataTransfer.files// 获取文件对象
      if (fileList) {
        this.onFileChange(fileList)// 上传文件的方法
      }
    }
    this.$refs.upload_box.ondragenter = (e) => {
      e.preventDefault()//  阻止拖入时的浏览器默认行为
    }
    this.$refs.upload_box.ondragover = (e) => {
      e.preventDefault()//  阻止拖来拖去的浏览器默认行为
    }
  }
}

export default uploadBase
