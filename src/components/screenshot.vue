<template>
    <div class="re-screenshot-container">
        <slot v-if="hasSlots" name="custom"></slot>
        <button v-else class="re-screenshot" @click="saveAsImage">{{msg}}</button>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
    import html2canvas from 'html2canvas'

    interface Opt {
        allowTaint: boolean
        tainttest: boolean
        logging: boolean
        scale?: number
        canvas?: any
        width?: number
        height?: number
    }

    @Component
    export default class ReSwitch extends Vue {
        $alert: any;
        $t: any;
        name: 're-screenshot';
        options: Opt = {
            allowTaint: true,//允许加载跨域的图片
            tainttest: true, //检测每张图片都已经加载完成
            logging: false, //日志开关，发布的时候记得改成false
            scale: null, // 添加的scale 参数
            canvas: null, //自定义 canvas
            width: null, //dom 原始宽度
            height: null //dom 原始高度
        };
        @Prop({default: '截图'}) msg: string;
        @Prop({default: '截图'}) fileName: string;
        @Prop({default: 5}) scaleBy: number;
        @Prop() targetId!: string;

        get hasSlots(): boolean {
            let isExist = false
            for (let key in this.$slots) {
                if (key === 'custom') {
                    isExist = true
                }
            }
            return isExist
        }

        saveAsImage(): void {
            let imageUrl = ''
            let dom = <HTMLScriptElement>document.getElementById(this.targetId) //获取目标对象
            let canvas = <HTMLCanvasElement>document.createElement('canvas');  //创建canvas 对象
            let width = dom.offsetWidth;  // 获取(原生）dom 宽度
            let height = dom.offsetHeight; // 获取(原生）dom 高
            let offsetTop = dom.offsetTop;  //元素距离顶部的偏移量
            let offsetLeft = dom.offsetLeft;  //元素距离顶部的偏移量
            let scale = this.scaleBy;
            let context = canvas.getContext('2d');
            canvas.width = (width + offsetLeft) * scale;   // 注意宽度问题， 是否存在左右间距
            canvas.height = (height + offsetTop) * scale;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
            context.scale(scale, scale);
            let opts = Object.assign(this.options, {scale, width, height})
            html2canvas(dom, opts).then((canvas: any) => {
                imageUrl = canvas.toDataURL('image/png');
                this.downLoad(imageUrl);
                this.$emit('onImageChange', imageUrl)
            });
        };

        downLoad(imageUrl: string) {
            if (!imageUrl) {
                this.$alert(this.$t('screenshots.alert'), 'error')
            } else {
                this.dataURIToBlob(imageUrl); // 先转化成blob文件，不然base64的长度会超出href的长度限制下载失败
            }
        }

        dataURIToBlob(dataURI: string) {
            let arr = dataURI.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            this.callback(new Blob([u8arr], { type: mime }));
        };

        callback(blob: any) {
            let a = <any>document.createElement('a');
            a.innerHTML = ' ';
            a.id = 'download-btn-pic';
            a.download = this.fileName || '截图'; //不能为空，ie浏览器会不能兼容
            a.innerHTML = 'download';
            a.href = <any> window.URL.createObjectURL(blob);
            console.log(a.href)
            this.clickEvent(a);
        };

        clickEvent(a: any) {
            if (document.all) {
                a.click();
                a.remove()
            } else {
                let evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                a.dispatchEvent(evt);
                a.remove();
            }
        };
    }
</script>

<style scoped>

</style>
