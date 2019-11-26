<template>
    <div class="re-upload-container">
        <div class="re-upload">
            <ul class="re-uploaded-pic-list">
                <li v-for="(file, index) in fileList" :key="index"
                    @mouseover="onToolOver(index)"
                    @mouseleave="onToolLeave(index)">
                    <div class="re-pic-show" :style="{backgroundImage: `url('${file.url}')`}"></div>
                    <div v-show="toolShow && index === toolIndex" class="re-uploaded-tools">
                        <div class="tools-icon">
                            <div @click="enlargeFile(file)" class="icon-enlarge"></div>
                            <div @click="deleteFile(index, file)" class="icon-trash"></div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="re-upload-box" ref='upload_box'>
                <i class="re-upload-icon"></i>
                <div class="re-upload-text">{{$t('upload.tip')}}</div>
                <input type="file" ref="input" class="re-upload-input" multiple @change="onFileUpload">
            </div>
        </div>
        <div class="re-upload-tips" v-html="tips"></div>
        <div class="re-model" v-show="model.show">
            <button class="re-close-btn">
                <div class="icon-close" @click="model.show = false"></div>
            </button>
            <div class="re-model-body">
                <img class="image-show" :alt="model.name" :src="model.url">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

    interface Request {
        id: number

        [key: string]: (any);
    }

    interface File {
        id: number
        name: string
        url: number
        type?: string
        size?: number

        [key: string]: (any);
    }

    @Component
    export default class ReUpload extends Vue {
        $refs: {
            [key: string]: (any);
        };
        $alert: any;
        name = 're-upload';
        model: any = {
            show: false,
            url: ''
        };
        fileList: File[] = [];
        fileListShow: File[] = [];
        toolShow: boolean = false;
        toolIndex: number = 0;
        @Prop({default: '只能上传jpg/png文件，且不超过500kb'}) tips: string;
        @Prop({default: () => ['image/jpeg', 'image/png', 'image/jpg']}) fileType: string[];
        @Prop({default: 2}) fileSize: number;
        @Prop({default: 9}) fileAmount: number;
        @Prop({default: 9}) url!: string;

        onToolOver(index: number) {
            this.toolShow = true;
            this.toolIndex = index;
        };

        onToolLeave(index: number) {
            this.toolShow = false;
            this.toolIndex = index;
        };

        deleteFile(index: number, file: File) {
            this.fileList.splice(index, 1);
            this.$emit('change', file, this.fileList);
        };

        enlargeFile(file: File) {
            this.model.show = true;
            this.model.name = file.name;
            this.model.url = file.url;
        }

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
                this.$alert('上传图片大小不能超过 2MB!', 'error');
                return
            }
            if (this.fileAmount && [...this.fileList, ...Object.values(fileList)].length > this.fileAmount) {
                // 上传图片数量不能大于9张!
                this.$alert('上传图片数量不能大于9张!', 'error');
                return
            }
            if (isFileType && isLtSize) {
                this.uploadFile(fileList);

            }
        };

        checkFileType(type: string) {
            return this.fileType.includes(type)
        };

        checkFileSize(size: number) {
            return size / 1024 / 1024 < this.fileSize
        };

        uploadFile(fileList: any[]) {  // 调用上传接口
            Object.values(fileList).forEach(file => {
                let formData = new FormData()
                formData.append('file', file)
                this.$axios.get(this.url, {data: formData}).then(res => {
                    file.id = (res as any).id
                    if ((<any>window).FileReader) {
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = e => {
                            file.url = (e.target as any).result;
                            this.fileList = [...this.fileList, file];
                            this.$emit('change', file, this.fileList)
                        }
                    } else {
                        this.fileList = [...this.fileList, file];
                        this.$emit('change', file, this.fileList)
                    }
                }).catch(error => {
                    this.$alert(error, 'error')
                })
            })
        };

        mounted() {
            // 拖拽事件
            this.$refs.upload_box.onclick = () => {
                this.$refs.input.click()
            }
            this.$refs.upload_box.ondragstart = () => {
                return false
            }
            this.$refs.upload_box.ondragleave = (e: any) => {
                e.preventDefault()// 阻止离开时的浏览器默认行为
            }
            this.$refs.upload_box.ondrop = (e: any) => {
                e.preventDefault()// 阻止拖放后的浏览器默认行为
                const fileList = e.dataTransfer.files// 获取文件对象
                if (fileList) {
                    this.onFileChange(fileList)// 上传文件的方法
                }
            }
            this.$refs.upload_box.ondragenter = (e: any) => {
                e.preventDefault()//  阻止拖入时的浏览器默认行为
            }
            this.$refs.upload_box.ondragover = (e: any) => {
                e.preventDefault()//  阻止拖来拖去的浏览器默认行为
            }
        };
    }
</script>

<style lang="scss" scoped>
    @import "../styles/coms/upload.scss";
</style>
