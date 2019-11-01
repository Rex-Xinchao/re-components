<template>
    <div id="app" class="main">
        <div class="card">
            <h1>Alert</h1>
            <button @click="$alert('hello')">hello</button>
            <button @click="$alert('success', 'success')">success</button>
            <button @click="$alert('danger', 'error')">danger</button>
        </div>
        <div class="card">
            <h1>Compress</h1>
            <Compress :size="{maxWidth: 100,maxHeight: 100}"></Compress>
        </div>
        <div class="card">
            <h1>Drag</h1>
            <Drag :listMap="listMap" @change="dragChange"></Drag>
        </div>
        <div class="card">
            <h1>DropMenu</h1>
            <DropMenu :width="120">
                <template slot="drop-link">
                    <span>你好</span>
                </template>
                <template slot="drop-down">
                    <div v-for="item in dropList" class="drop-down-item" :value="item.value">{{item.label}}</div>
                </template>
            </DropMenu>
        </div>
        <div class="card">
            <h1>Menu</h1>
            <Menu :options="menuList" :default="2">
                <template slot-scope="props">
                    <span :value="props.value">{{ props.label }}</span>
                </template>
                <template slot="rightTools">
                    <span>司机上传回单</span>
                </template>
            </Menu>
        </div>
        <div class="card">
            <h1>Progress</h1>
            <ProgressLine :progress="progress"></ProgressLine>
            <ProgressCircle :progress="progress"></ProgressCircle>
        </div>
        <div class="card">
            <h1>ScreenShot</h1>
            <ScreenShot @onImageChange="imageChange" targetId="app"></ScreenShot>
        </div>
        <div class="card">
            <h1>Switch</h1>
            <ReSwitch @change="switchChange"></ReSwitch>
            <ReSwitch :_isDisabled="true" @change="switchChange"></ReSwitch>
        </div>
        <div class="card">
            <h1>Upload</h1>
            <Upload :url="'https://jsonplaceholder.typicode.com/posts/'" @change="uploadChange"></Upload>
        </div>
    </div>
</template>

<script>
import Compress from '../src/coms/compress/index'
import Drag from '../src/coms/drag/index'
import DropMenu from '../src/coms/dropMenu/index'
import Menu from '../src/coms/menu/index'
import ProgressLine from '../src/coms/progress/lineIndex'
import ProgressCircle from '../src/coms/progress/CircleIndex'
import ScreenShot from '../src/coms/screenshot/index'
import ReSwitch from '../src/coms/switch/index'
import Upload from '../src/coms/upload/index'

export default {
  name: 'app',
  components: { Compress, Drag, DropMenu, Menu, ProgressLine, ProgressCircle, ScreenShot, ReSwitch, Upload },
  data () {
    return {
      listMap: {one: [1,2,3], two: [4,5,6], three: [7,8,9]},
      dropList: [{ value: 1, label: '测试一' }, { value: 2, label: '测试二' }, { value: 3, label: '测试三' }],
      menuList: [{ label: '全部运单', value: 1, disabled: true }, { label: '在途跟踪', value: 2 }, { label: '异常处理', value: 3 }],
      progress: 50
    }
  },
  methods: {
    dragChange(e) {
      console.log(e)
    },
    imageChange (e) {
      console.log(e)
    },
    switchChange (e) {
      console.log(e)
    },
    uploadChange (e) {
      console.log(e)
    }
  },
  mounted () {
    this.$i18n.locale = 'zhCN'
    let a = setInterval(e => {
      if (this.progress < 100) {
        this.progress++
      } else {
        clearInterval(a)
      }
    }, 30)
  }
}
</script>
<style scoped>
    .card {
        width: 100%;
        height: auto;
        min-height: 100px;
        margin-bottom: 20px;
    }
</style>
