<template>
    <transition name="slide-fade">
        <div class="re-alert" v-if="show" :style="{background: this.bgColor, borderColor: this.bgColor}">
            <p class="re-alert--text" :style="{color: this.textColor}">{{message}}</p>
        </div>
    </transition>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {textColorObj, bgColorObj} from '@lib/alert/config'

    @Component
    export default class HelloWorld extends Vue {
        $refs: {
            [key: string]: (any);
        };
        name = 're-alert';
        // data
        show: boolean = false;
        type: 'default' | 'success' | 'error' | 'info' = null;
        time: number = 3;
        message: string = null;
        textColor: string = null;
        bgColor: string = null;

        // methods
        alertMsg() {
            this.show = true;
            this.setColor();
            this.hideAlertMsg();
        };

        setColor() {
            this.textColor = textColorObj[this.type];
            this.bgColor = bgColorObj[this.type];
        };

        hideAlertMsg() {
            setTimeout(() => {
                this.show = false;
            }, this.time * 1000)
        };

        // 钩子函数
        mounted() {
            this.alertMsg();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/coms/alert";
</style>
