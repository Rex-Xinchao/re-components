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
            <p class="re-compress__text">
                {{`${$t("compress.selectText")}：${file.name}，${$t("compress.sizeText")}：${file.size && file.size.toFixed(3)}M`}}</p>
            <p class="re-compress__text">{{`${$t("compress.oldPicSizeText")}：${file.width}x${file.height}`}}</p>
            <p class="re-compress__text">{{`${$t("compress.newPicSizeText")}：${newFile.width}x${newFile.height}`}}</p>
            <p class="re-compress__text">{{$t("compress.success")}}，<a :href="newFile.imageUrl" :download="file.name">{{$t("compress.download")}}</a>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {dataURIToBlob, downloadFile, registerDrag} from '@lib/file/file'

    interface File {
        id: number
        name: string
        url: number
        type?: string
        size?: number

        [key: string]: (any);
    }

    interface FileOps {
        name?: string
        size?: number
        width: number
        height: number
        imageUrl?: string
    }

    interface Size {
        maxWidth: number
        maxHeight: number
    }

    @Component
    export default class ReCompress extends Vue {
        $refs: any;
        $alert: any;
        $t: any;
        name = 're-compress';
        file: FileOps = {
            name: null,
            size: null,
            width: null,
            height: null
        };
        newFile: FileOps = {
            width: null,
            height: null,
            imageUrl: null
        };
        url: string;
        fileList: any[] = [];
        fileType: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
        fileSize: number = 5;
        show: boolean = false;
        @Prop({
            default: () => {
                return {
                    maxWidth: 400,
                    maxHeight: 400
                }
            }
        }) size: Size;
        @Prop({default: 9}) fileAmount: number;

        onFileUpload(e: any) {
            const fileList = e.target.files;
            this.onFileChange(fileList);
        };

        onFileChange(fileList: File[]) {
            let isFileType = true;
            let isLtSize = true;
            Object.values(fileList).forEach(file => {
                this.checkFileType(file.type) || (isFileType = false);
                this.checkFileSize(file.size) || (isLtSize = false);
            });
            if (!isFileType) {
                // 文件格式错误!
                this.$alert('文件格式错误!', 'error');
                return
            }
            if (!isLtSize) {
                // 上传图片大小不能超过 2MB!
                this.$alert('上传图片大小不能超过 ' + this.fileSize + 'MB!', 'error');
                return
            }
            if (this.fileAmount && [...this.fileList, ...Object.values(fileList)].length > this.fileAmount) {
                // 上传图片数量不能大于9张!
                this.$alert('上传图片数量不能大于' + this.fileAmount + '张!', 'error');
                return
            }
            if (isFileType && isLtSize) {
                this.analysisFile(fileList[0]);
            }
        };

        analysisFile(file: any) { // 解析文件
            let reader = new FileReader();
            let img = new Image();
            let canvas = <HTMLCanvasElement>document.createElement('canvas');
            let context = canvas.getContext('2d');
            this.file.name = file.name;
            this.file.size = file.size / 1024 / 1024;
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                img.src = e.target.result;
            };
            img.onload = (e: any) => {
                // 图片原始尺寸
                let {width, height} = e.path[0];
                Object.assign(this.file, {width, height});
                // 最大尺寸限制
                let {maxWidth, maxHeight} = this.size;
                // 目标尺寸
                let {targetWidth, targetHeight} = {targetWidth: width, targetHeight: height};
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
                this.newFile.imageUrl = canvas.toDataURL('image/png');
                this.show = true;
            }
        }

        checkFileType(type: string) {
            return this.fileType.includes(type)
        }

        checkFileSize(size: number) {
            return size / 1024 / 1024 < this.fileSize
        }

        mounted() {
            // 注册拖拽事件
            registerDrag(this.$refs.upload_box, this.$refs.input, this.onFileChange)
        }
    }

</script>

<style lang="scss">
    @import "../styles/coms/compress.scss";
    @import "../styles/coms/upload.scss";
</style>
