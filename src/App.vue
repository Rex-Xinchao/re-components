<template>
    <div id="app">
        <div class="item-menu" title="菜单">
            <ReMenu :options="menuList" :default="2" style="height: 40px; width: 1200px">
                <template slot-scope="props">
                    <span :value="props.value">{{ props.label }}</span>
                </template>
                <template slot="rightTools">
                    <span>插槽</span>
                </template>
            </ReMenu>
        </div>
        <div class="item-alert" title="alert">
            <div>
                <button class="re-button" style="float: left" @click="$alert('hello')">hello</button>
                <button class="re-button" style="float: left" @click="$alert('success', 'success')">success</button>
                <button class="re-button" style="float: left" @click="$alert('danger', 'error')">danger</button>
            </div>
        </div>
        <div class="item" title="开关">
            <Re-Switch @change="switchChange"></Re-Switch>
        </div>
        <div class="item" title="下拉菜单">
            <ReDropDown :width="120">
                <template slot="drop-link">
                    <span>你好</span>
                </template>
                <template slot="drop-down">
                    <div v-for="item in dropList" class="drop-down-item" :value="item.value">{{item.label}}</div>
                </template>
            </ReDropDown>
        </div>
        <div class="item" title="截屏">
            <ReScreenShot targetId="screen" @onImageChange="imageChange"></ReScreenShot>
        </div>
        <div class="item-compress" title="压缩">
            <ReCompress :size="{maxWidth: 100,maxHeight: 100}"></ReCompress>
        </div>
        <div class="item-drag" title="拖拽">
            <ReDrag :listMap="listMap" @change="dragChange"></ReDrag>
        </div>
        <div class="item-upload" title="图片上传" id="screen">
            <Re-Upload
                    :fileAmount="2"
                    :url="'https://jsonplaceholder.typicode.com/posts/'"
                    @change="uploadChange">
            </Re-Upload>
        </div>
        <div class="item" title="进度条——圆形">
            <Re-Circle></Re-Circle>
        </div>
        <div class="item" title="进度条--线形">
            <Re-Line :height="25"></Re-Line>
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
    import ReCompress from './components/compress.vue';
    import ReDrag from './components/drag.vue';
    import ReDropDown from './components/dropDown.vue';
    import ReMenu from './components/menuTag.vue';

    @Component({
        components: {
            ReSwitch, ReCircle, ReLine, ReUpload, ReScreenShot, ReCompress, ReDrag, ReDropDown, ReMenu
        }
    })
    export default class App extends Vue {
        menuList: any[] = [{label: '菜单A', value: 1, disabled: true}, {label: '菜单B', value: 2}, {
            label: '菜单C',
            value: 3
        }];
        listMap: { [key: string]: any[] } = {one: [1, 2, 3], two: [4, 5, 6], three: [7, 8, 9]};
        dropList: any[] = [{value: 1, label: '测试一'}, {value: 2, label: '测试二'}, {value: 3, label: '测试三'}];

        dragChange(res: any): void {
            console.log(res)
        };

        imageChange(res: any): void {
            console.log(res)
        };

        switchChange(res: any): void {
            console.log(res)
        };

        uploadChange(res: any): void {
            console.log(res)
        };
    }
</script>
<style lang="scss">
    body{
        --main-color: #409eff;
        --main-color_light: #66b1ff;
        --text-color: #ffffff;
        --btn-size: 8px 15px;
    }
    @import './styles/basic';
</style>
<style lang="scss" scoped>
    #app {
        width: 100%;
        height: auto;
        display: inline-grid;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-template-rows: repeat(4, 250px);
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;

        .item-menu {
            grid-column: 1 / 6;
        }
        .item-alert {
            grid-column: 1 / 3;
        }
        .item-upload {
            grid-column: 1 / 3;
        }
        .item-compress{
            grid-column: 1 / 3
        }
        .item-drag {
            grid-column: 3 / 6;
        }
    }
</style>
