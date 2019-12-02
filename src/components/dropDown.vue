<template>
    <div class="re-drop-menu" ref="dropDown">
        <div class="re-drop-link" @click="showDropDown">
            <slot v-if="hasSlots" name="drop-link"></slot>
            <span v-else>{{text}}</span>
        </div>
        <div class="re-drop-down-list" v-if="isShow">
            <slot name="drop-down"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

    @Component
    export default class ReDropDown extends Vue {
        $refs: any;
        name = 're-drop-down';
        isShow: boolean = false;
        @Prop() text: string;
        @Prop({default: 80}) width: number;

        get hasSlots(): boolean {
            let isExist = false;
            for (let key in this.$slots) {
                if (key === 'drop-link') {
                    isExist = true
                }
            }
            return isExist
        };

        setWidth() {
            this.$refs.dropDown.style.width = this.width + 'px'
        };

        showDropDown() {
            this.isShow = !this.isShow
        };

        mounted() {
            this.setWidth();
            // 点击区域外收回弹窗
            let $body = <HTMLHtmlElement>document.getElementsByTagName('html')[0];
            $body.onclick = (e: any) => {
                let isExist = false;
                e.path.forEach((item: any) => {
                    if (item.className && item.className.includes('re-drop-menu')) {
                        isExist = true;
                    }
                });
                isExist || (this.isShow = false)
            }
        };
    }
</script>

<style lang="scss" scoped>
    @import "../styles/coms/dropMenu";
</style>
