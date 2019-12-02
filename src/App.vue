<template>
    <div id="app">
        <div class="item" title="switch开关">
            <Re-Switch></Re-Switch>
        </div>
        <div class="item" title="进度条——圆形">
            <Re-Circle></Re-Circle>
        </div>
        <div class="item" title="进度条--线形">
            <Re-Line :height="25"></Re-Line>
        </div>
        <div class="item-upload" title="图片上传" id="screen">
            <Re-Upload :fileAmount="2" :url="'https://jsonplaceholder.typicode.com/posts/'"
                       @change="onUploadChange"></Re-Upload>
        </div>
        <div class="item" title="截屏">
            <ReScreenShot targetId="screen"></ReScreenShot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ReSwitch from './components/switch.vue';
    import ReCircle from './components/circle_progress.vue';
    import ReLine from './components/line_progress.vue';
    import ReUpload from './components/upload.vue';
    import ReScreenShot from './components/screenshot.vue';

    @Component({
        components: {
            ReSwitch, ReCircle, ReLine, ReUpload, ReScreenShot
        }
    })
    export default class App extends Vue {
        onUploadChange(res: any) {
            console.log(res.file);
            console.log(res.fileList);
        }
    }
</script>
<style lang="scss" scoped>
    #app {
        width: 100%;
        height: auto;
        display: inline-grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-template-rows: repeat(auto-fill, 250px);
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;

        .item-upload {
            grid-column: 4 / 6;
        }
    }
</style>
